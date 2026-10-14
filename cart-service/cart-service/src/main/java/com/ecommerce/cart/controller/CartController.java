package com.ecommerce.cart.controller;

import com.ecommerce.cart.entity.Cart;
import com.ecommerce.cart.service.CartService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping
    public Cart addToCart(@Valid @RequestBody Cart cart) {
        return cartService.addToCart(cart);
    }

    @GetMapping
    public List<Cart> getAllCartItems() {
        return cartService.getAllCartItems();
    }

    @GetMapping("/user/{userId}")
    public List<Cart> getCartByUserId(@PathVariable Long userId) {
        return cartService.getCartByUserId(userId);
    }

    @GetMapping("/{id}")
    public Cart getCartItemById(@PathVariable Long id) {
        return cartService.getCartItemById(id);
    }
    @PutMapping("/{id}")
    public Cart updateCartQuantity(
            @PathVariable Long id,
            @RequestParam Integer quantity) {

        return cartService.updateCartQuantity(id, quantity);
    }

    @DeleteMapping("/{id}")
    public String deleteCartItem(@PathVariable Long id) {
        cartService.deleteCartItem(id);
        return "Cart item deleted successfully";
    }

}