﻿window.kongregateFunctions = {
    var dotNet;
    getUsername: function () {
        // You can now access the Kongregate API with:
        // kongregate.services.getUsername(), etc
        // Proceed with loading your game...

        if (window.kongregate.services.isGuest()) {
            return "";
        } else {
            return window.kongregate.services.getUsername();
        }
    },
	    getUserID: function () {
        // You can now access the Kongregate API with:
        // kongregate.services.getUsername(), etc
        // Proceed with loading your game...

        if (window.kongregate.services.isGuest()) {
            return "You are a guest.";
        } else {
            return window.kongregate.services.getUserId();
        }
    },
	getToken: function () {
        if (window.kongregate.services.isGuest()) {
            return "";
        }
        else {
            return window.kongregate.services.getGameAuthToken();
        }
    },
    updateTotalLevelScore: function (totalLevel) {
        window.kongregate.stats.submit("Total Level", totalLevel);
    },
    updateTotalKills: function (totalKills) {
        window.kongregate.stats.submit("Total Kills", totalKills);
    },
    purchasePet: function (petIdentifier, dotNetInstance) {               
        console.log("Purchase requested for " + petIdentifier);   
        if (kongregate.services.isGuest() == false) {
            dotNet = dotNetInstance;
            window.kongregate.mtx.purchaseItems([petIdentifier], window.kongregateFunctions.onPurchaseResult);
            console.log("Post Purchase Requested");
        }
        else {
            console.log("Is guest.");
        }
        
    },

    onPurchaseResult: function (result) {
        
        if (result.success == true) {
            console.log("Purchase Successful");
            dotNet.invokeMethodAsync('PurchasePet');         
        }
        else {
            console.log("Purchase Failed");
            dotNet.invokeMethodAsync('CancelPurchase');     
        }
        
    },
    createSortableList: function (listElement) {
        Sortable.create(listElement, {
            group: "localStorage-example",
            easing: "cubic-bezier(0.075, 0.82, 0.165, 1)",
            animation: 90,
            sort:false,
            store: {
                /**
                 * Get the order of elements. Called once during initialization.
                 * @param   {Sortable}  sortable
                 * @returns {Array}
                 */
                get: function (sortable) {
                    var order = localStorage.getItem(sortable.options.group.name);
                    return order ? order.split('|') : [];
                },

                /**
                 * Save the order of elements. Called onEnd (when the item is dropped).
                 * @param {Sortable}  sortable
                 */
                set: function (sortable) {
                    var order = sortable.toArray();
                    localStorage.setItem(sortable.options.group.name, order.join('|'));
                }
            },

        })
    
    }
};