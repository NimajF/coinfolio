import {
  createContext,
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { getUser, updateUserPortfolio } from "@/utils/favoritesHandler";
import { useSession } from "next-auth/react";
import {
  calculateTotalPnL,
  fetchPricesFromAPI,
} from "@/utils/calculateTotalPnL";

export const UserPortfolioContext = createContext();

export const UserPortfolioProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const defaultPortfolio = {
    coins: [],
    totalInvestment: 0,
  };
  const [portfolio, setPortfolio] = useState(defaultPortfolio);
  const [symbols, setSymbols] = useState([]);
  const [prices, setPrices] = useState(null);
  const [pnl, setPnl] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (!session?.user) return;
    const loadPortfolio = async () => {
      const userId = session.user._id;
      const storedPortfolio = localStorage.getItem(`userPortfolio_${userId}`);

      if (storedPortfolio) {
        // Cargar el portfolio del localStorage si existe
        setPortfolio(JSON.parse(storedPortfolio));
      } else {
        try {
          // Intentar obtener el portfolio de la base de datos si no está en el localStorage
          const res = await getUser(userId);
          if (res.success && res.data.portfolio && res.data.portfolio.coins) {
            setPortfolio(res.data.portfolio);
            localStorage.setItem(
              `userPortfolio_${userId}`,
              JSON.stringify(res.data.portfolio)
            );
          } else {
            // Si no hay portfolio en la BD, usar el portfolio por defecto
            setPortfolio(defaultPortfolio);
            localStorage.setItem(
              `userPortfolio_${userId}`,
              JSON.stringify(defaultPortfolio)
            );
          }
        } catch (error) {
          console.error("Error fetching user portfolio:", error);
          setPortfolio(defaultPortfolio);
        }
      }
      setIsLoading(false);
    };

    loadPortfolio();
  }, [session]);

  const newSymbols = useMemo(() => {
    if (!isLoading && portfolio?.coins) {
      return Array.from(new Set(portfolio.coins.map((c) => c.coinId)));
    }
    return [];
  }, [portfolio, isLoading]);

  useEffect(() => {
    if (newSymbols.length > 0) {
      const userId = session?.user?._id;
      if (userId) {
        // Guardar el portfolio en localStorage usando la clave del userId
        localStorage.setItem(
          `userPortfolio_${userId}`,
          JSON.stringify(portfolio)
        );
      }
      setSymbols(newSymbols);
    }
  }, [newSymbols, portfolio, session]);

  useEffect(() => {
    if (refresh && session?.user) {
      const syncPortfolioToDB = async () => {
        try {
          await updateUserPortfolio(portfolio, session.user._id);
          fetchSymbols();
        } catch (error) {
          console.error("Error syncing portfolio to DB:", error);
        }
      };
      syncPortfolioToDB();
      setRefresh(false);
    }
  }, [refresh, prices]);

  const fetchSymbols = useCallback(async () => {
    try {
      const res = await fetchPricesFromAPI(symbols);
      if (res) {
        setPrices(res);
        const actualPnl = calculateTotalPnL(portfolio, res);
        setPnl(actualPnl);
      }
    } catch (error) {
      console.error("Error fetching prices:", error);
    }
  }, [symbols, portfolio, refresh]);

  useEffect(() => {
    if (symbols.length > 0 && !prices) {
      fetchSymbols();
    }
  }, [symbols, prices, fetchSymbols]);

  useEffect(() => {
    if (!session?.user) {
      setPortfolio(defaultPortfolio);
      localStorage.removeItem(`userPortfolio_${session?.user?._id}`);
    }
  }, [session]);

  const addOrUpdateCoin = (
    coinName,
    amount,
    price,
    inversion,
    coinId,
    coinImage
  ) => {
    const date = new Date().toISOString();
    setPortfolio((prevPortfolio) => {
      const updatedCoins = Array.isArray(prevPortfolio.coins)
        ? [...prevPortfolio.coins]
        : [];
      const coinIndex = updatedCoins.findIndex(
        (coin) => coin.symbol === coinName
      );

      if (coinIndex !== -1) {
        const existingCoin = updatedCoins[coinIndex];
        updatedCoins[coinIndex] = {
          ...existingCoin,
          transactions: [
            ...existingCoin.transactions,
            {
              amount: parseFloat(amount),
              price: parseFloat(price),
              transactionInversion: parseFloat(inversion),
              date,
            },
          ],
          totalAmount:
            parseFloat(existingCoin.totalAmount) + parseFloat(amount),
          totalCoinInversion:
            parseFloat(existingCoin.totalCoinInversion) + parseFloat(inversion),
        };
      } else {
        updatedCoins.push({
          symbol: coinName,
          coinId: coinId,
          coinImage,
          transactions: [
            {
              amount: parseFloat(amount),
              price: parseFloat(price),
              transactionInversion: parseFloat(inversion),
              date,
            },
          ],
          totalAmount: parseFloat(amount),
          totalCoinInversion: parseFloat(inversion),
        });
      }

      return {
        ...prevPortfolio,
        coins: updatedCoins,
        totalInvestment:
          parseFloat(prevPortfolio.totalInvestment || 0) +
          parseFloat(inversion),
      };
      //   if (updatedCoins[coinName]) {
      //     updatedCoins[coinName].transactions?.push({
      //       amount,
      //       inversion,
      //       date,
      //       price,
      //     });
      //     updatedCoins[coinName].totalAmount += amount;
      //   } else {
      //     updatedCoins[coinName] = {
      //       transactions: [
      //         {
      //           amount,
      //           inversion,
      //           date,
      //           price,
      //         },
      //       ],
      //       totalAmount: amount,
      //     };
      //   }
      //   addToTotalInvestment(inversion);
      //   return { ...prevPortfolio, coins: updatedCoins };
    });
  };

  // const getAmountOfXCoin = (coinName) => {
  //   const total = Object.keys(portfolio.coins);
  //   console.log(total);

  //   return total;
  // };

  return (
    <UserPortfolioContext.Provider
      value={{
        portfolio,
        setPortfolio,
        addOrUpdateCoin,
        symbols,
        pnl,
        prices,
        refresh,
        setRefresh,
      }}
    >
      {children}
    </UserPortfolioContext.Provider>
  );
};
