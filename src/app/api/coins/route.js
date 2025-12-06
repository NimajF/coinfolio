import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=layer-1&order=market_cap_desc&per_page=20&price_change_percentage=1h%2C24h%2C7d";
    
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": process.env.NEXT_PUBLIC_COIN_API_KEY,
      },
    };

    const response = await fetch(url, options);
    
    if (!response.ok) {
      if (response.status === 429) {
        return NextResponse.json(
          { success: false, error: "Rate limit exceeded. Please try again later." },
          { status: 429 }
        );
      }
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json({
      success: true,
      data: data
    });

  } catch (error) {
    console.error('Error fetching coins data:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || "Failed to fetch coins data" 
      },
      { status: 500 }
    );
  }
}