import express from 'express';

const app= express();

const port= process.env.PORT || 3000;

app.get('/api/products',(req,res)=> {
    const products= [
        {
            id: 1,
            name:'table wooden',
            price: 200,

        },
        {
            id: 2,
            name:'table glass',
            price: 300,
            
        },
        {
            id: 1,
            name:'table iron',
            price: 400,
            
        }
    ]

    // http://localhost:3000/api/products?search=metal

    if(req.query.search){
        const filterProducts= products.filter( product => 
            product.name.includes(req.query.search))
            res.send(filterProducts);
            return;
    }

    setTimeout(()=> {
      res.send(products);
    },3000)
    //res.send(products);
})

app.listen(port,()=> {
    console.log('Server running on port ${port}');
})
