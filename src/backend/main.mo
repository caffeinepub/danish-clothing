import Map "mo:core/Map";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Array "mo:core/Array";

actor {
  type Product = {
    id : Text;
    name : Text;
    category : Text;
    price : Nat;
    description : Text;
    imageUrl : Text;
  };

  type CartItem = {
    productId : Text;
    quantity : Nat;
  };

  // Products Store
  let productsStore = Map.empty<Text, Product>();

  // Carts Store - using stable PersistentMap
  let cartsStore = Map.empty<Principal, List.List<CartItem>>();

  // Pre-populate products
  public shared ({ caller }) func initProducts() : async () {
    if (productsStore.size() > 0) { return };

    // Men
    addProduct("1", "Classic Polo Shirt", "Men", 4500, "Timeless polo for any occasion.", "https://images.app.goo.gl/xn2bMf3DiMZX5t5V7");
    addProduct("2", "Slim Fit Jeans", "Men", 6000, "Comfortable & stylish slim jeans.", "https://images.app.goo.gl/LmQKBVdTLhbykevK7");
    addProduct("3", "Men's Hoodie", "Men", 5500, "Warm & cozy hoodie for all seasons.", "https://images.app.goo.gl/EUp9efWK597zNg9R9");

    // Women
    addProduct("4", "Summer Dress", "Women", 7400, "Light & breezy dress for summer.", "https://images.app.goo.gl/LFTHiVLkSUdbEhAz8");
    addProduct("5", "Women Suit", "Women", 12000, "Casual Suit for women", "https://images.app.goo.gl/DQuYnQyQoEdmGztF7");
    addProduct("6", "High Waist Jeans", "Women", 6500, "Versatile high-waisted denims.", "https://images.app.goo.gl/tRF4KgDFuExr57wA8");

    // Accessories
    addProduct("7", "Leather Wallet", "Accessories", 2400, "Stylish wallet with RFID block.", "https://images.app.goo.gl/QfXDQh2gZPJehR447");
    addProduct("8", "Baseball Cap", "Accessories", 1800, "Adjustable fit cotton cap.", "https://images.app.goo.gl/L9jqwZHDqDXAtKBh8");
    addProduct("9", "Winter Scarf", "Accessories", 3200, "Warm & soft woven scarf.", "https://images.app.goo.gl/ookZXPS0Usw1stQT7");
  };

  func addProduct(id : Text, name : Text, category : Text, price : Nat, desc : Text, img : Text) {
    let product : Product = {
      id;
      name;
      category;
      price;
      description = desc;
      imageUrl = img;
    };
    productsStore.add(id, product);
  };

  // Product Functions
  public query ({ caller }) func getAllProducts() : async [Product] {
    productsStore.values().toArray();
  };

  public query ({ caller }) func getProductsByCategory(category : Text) : async [Product] {
    productsStore.values().toArray().filter(
      func(p) { Text.equal(p.category, category) }
    );
  };

  public query ({ caller }) func getProductById(id : Text) : async Product {
    switch (productsStore.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  // Cart Functions
  public shared ({ caller }) func addToCart(productId : Text, quantity : Nat) : async () {
    switch (productsStore.get(productId)) {
      case (null) { Runtime.trap("Product not found") };
      case (?_product) {
        let cart = switch (cartsStore.get(caller)) {
          case (null) {
            let newCart = List.empty<CartItem>();
            newCart.add({ productId; quantity });
            newCart;
          };
          case (?cart) {
            let currentCart = List.empty<CartItem>();
            for (item in cart.values()) {
              if (Text.equal(item.productId, productId)) {
                let updatedItem = {
                  productId;
                  quantity = item.quantity + quantity;
                };
                currentCart.add(updatedItem);
              } else {
                currentCart.add(item);
              };
            };
            if (cart.isEmpty()) {
              currentCart.add({ productId; quantity });
            };
            currentCart;
          };
        };
        cartsStore.add(caller, cart);
      };
    };
  };

  public shared ({ caller }) func removeFromCart(productId : Text) : async () {
    switch (cartsStore.get(caller)) {
      case (null) { Runtime.trap("Cart is empty") };
      case (?cart) {
        let filteredCart = cart.filter(
          func(item) { not Text.equal(item.productId, productId) }
        );

        if (filteredCart.isEmpty()) {
          (ignore cartsStore.remove(caller));
        } else {
          cartsStore.add(caller, filteredCart);
        };
      };
    };
  };

  public shared ({ caller }) func clearCart() : async () {
    (ignore cartsStore.remove(caller));
  };

  public query ({ caller }) func getCart() : async [CartItem] {
    switch (cartsStore.get(caller)) {
      case (null) { [] };
      case (?cart) { cart.toArray() };
    };
  };

  public query ({ caller }) func getCartTotal() : async Nat {
    switch (cartsStore.get(caller)) {
      case (null) { 0 };
      case (?cart) {
        var total = 0;
        for (item in cart.values()) {
          switch (productsStore.get(item.productId)) {
            case (?product) { total += product.price * item.quantity };
            case (null) {};
          };
        };
        total;
      };
    };
  };

  public query ({ caller }) func getAllCarts() : async [(Principal, [CartItem])] {
    cartsStore.toArray().map(
      func((principal, cartItems)) {
        (principal, cartItems.toArray());
      }
    );
  };
};
