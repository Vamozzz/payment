// pages/api/proxy.ts

export default async function handler(req:any, res:any){
    try {
      const response = await fetch('https://vampay.in/Merchent/InvoiceTransactionWebhook', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch data from backend API');
      }
  
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  