document.getElementById('adminForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    const name = document.getElementById('name').value;
    const category = document.getElementById('category').value;
    const price = document.getElementById('price').value;
    const imageUrl = document.getElementById('imageUrl').value; 
    
    const product = {
        name: name,
        category: category,
        price: price,
        image: imageUrl 
    };

    let cakes = JSON.parse(localStorage.getItem('cake')) || [];
 
    let cupcakes = JSON.parse(localStorage.getItem('cupcake')) || [];
    let doughnuts = JSON.parse(localStorage.getItem('doughnuts')) || [];
    let allItems = JSON.parse(localStorage.getItem('allItems')) || [];

    const isDuplicate = allItems.some(item =>  item.image === imageUrl);   

        if (isDuplicate) {
            alert('Item already exists.');
            return;
        }

    if (category.toLowerCase() === 'cake') {
        cakes.push(product);
        localStorage.setItem('cakes', JSON.stringify(cakes));
    } else if (category.toLowerCase() === 'cupcake') {
        cupcakes.push(product);
        localStorage.setItem('cupcakes', JSON.stringify(cupcakes));
    } else if (category.toLowerCase() === 'doughnuts') {
        doughnuts.push(product);
        localStorage.setItem('doughnuts', JSON.stringify(doughnuts));
    } 

    allItems.push(product);
    localStorage.setItem('allItems', JSON.stringify(allItems));

    document.getElementById('adminForm').reset();
    alert("Item Added");
    

    
});

