import { NextResponse } from 'next/server';

export const revalidate = 0
export default async function GET(req: Request) {
    console.log('TESSSSSSTTT');
    
    const result= {key: 'sadsa'}
    return NextResponse.json({
        result:result
    });
}