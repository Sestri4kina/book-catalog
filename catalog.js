(function(window){

    function myCatalog(){

        //execute code here
        var catalog = createRandomCatalog(100);

        return {
            searchBookById: searchBookById,
            searchBooksByPrice: searchBooksByPrice,
            searchBooksByType: searchBooksByType,
            searchAllBooks: searchAllBooks
        };

        //function definitions go here
        function createRandomBook(){
            var typeArray = ['Science Fiction','Suspense','Fantasy','Art','Computers','Technology'];
            var price = (Math.random()*50).toFixed(2);
            var type = typeArray[Math.floor(Math.random()*6)];

            return {price:price, type:type};
        }

        function createRandomCatalog(num){
            var catalog = [];
            for (var i = 0; i < num; i++){
                var obj = createRandomBook();
                catalog.push({id:i,price:obj.price,type:obj.type});
            }
            return catalog;
        }

        function searchAllBooks(){
            var promise = new Promise(function(resolve, reject) {

                setTimeout(function(){
                    resolve(catalog);
                },1000);

            });
            return promise;
        }

        function searchBookById(id){

            var promise = new Promise(function(resolve,reject){
                var i = 0;
                setTimeout(function(){
                    while (i < catalog.length){
                        if (catalog[i].id == id){
                            resolve({id:id,price:catalog[i].price,type:catalog[i].type});
                        }
                        i++;
                    }
                    reject("Invalid ID: " + id);
                },1000);
            });
            return promise;
        }

        function searchBooksByType(type){

            var promise = new Promise(function(resolve,reject){
                var i = 0;
                var typeArray = [];
                var possibleTypes = ['Science Fiction','Suspense','Fantasy','Art',' Computers','Technology'];
                if(!possibleTypes.includes(type)){
                    reject("Invalid Type: " + type)
                }
                else{
                    setTimeout(function(){
                        while (i < catalog.length){
                            if (catalog[i].type == type){
                                typeArray.push({id:catalog[i].id,price:catalog[i].price,type:catalog[i].type});
                            }
                            i++;
                        }
                        resolve(typeArray);
                    },1000);
                }
            });
            return promise;
        }

        function searchBooksByPrice(price,difference){
            var promise = new Promise(function(resolve,reject){
                var i = 0;
                var priceArray = [];
                if(!isFinite(price)){
                    reject("Invalid Price: " + price)
                }
                else{
                    setTimeout(function(){
                        while (i < catalog.length){
                            if (Math.abs(catalog[i].price - price) < difference){
                                priceArray.push({id:catalog[i].id,price:catalog[i].price,type:catalog[i].type});
                            }
                            i++;
                        }
                        resolve(priceArray);
                    },1000);
                }
            });
            return promise;
        }


    }


    if(typeof(window.api) === 'undefined'){
        window.api = myCatalog();
    }

})(window);
