// const productsData = [
//     {
//         id: "1",
//         image: "path/to/image1.jpg",
//         name: "Enchanted Elegance Bouquet",
//         prices: { 'S': 19.99, 'M': 24.99, 'L': 29.99 },
//         description: "A timeless arrangement of roses and lilies, the Enchanted Elegance Bouquet exudes sophistication and grace for any special occasion.",
//         colors: ['pink', 'white', 'beige', 'red'],
//         sizes: ['S', 'M', 'L'],
//     },
//     {
//         id: "2",
//         image: "path/to/image2.jpg",
//         name: "Whimsical Garden Dream Bouquet",
//         prices: { 'S': 29.99, 'M': 34.99, 'L': 39.99 },
//         description: "A burst of vibrant tulips and wildflowers, the Whimsical Garden Dream Bouquet brings joy and nature's enchantment into any space.",
//         colors: ['pink', 'white', 'beige', 'red'],
//         sizes: ['S', 'M', 'L'],
//     },
//     {
//         id: "3",
//         image: "path/to/image3.jpg",
//         name: "Serenity Bliss Blossoms",
//         prices: { 'S': 29.99, 'M': 34.99, 'L': 39.99 },
//         description: "An aromatic blend of lavender roses and chamomile daisies, the Serenity Bliss Blossoms create a peaceful atmosphere for conveying heartfelt well wishes",
//         colors: ['pink', 'white', 'beige', 'red'],
//         sizes: ['S', 'M', 'L'],
//     },
    

// ];

// export const getProduct = (productId) => {
//     const result = productsData.filter(product => product.id === productId)
//     if(result.length === 0) {
//         return null
//     } else {
//         return result[0]
//     }
// }

export const DELIVERY = [
    {name: "Courier - Inpost", price: 9.99, icon: "courier", id: 1},
    {name: "In store pick-up", price: 0, icon: "build", id: 2},
    {name: "Inpost Parcel locker 24/7", price: 8.99, icon: "inpost", id: 3},
    {name: "Pick-up point - Żabka", price: 5.99, icon: "build", id: 4}
]
  
//   export default productsData;