package com.ecommerce.cart.service;

import com.ecommerce.cart.client.ProductClient;
import com.ecommerce.cart.client.ProductResponse;
import com.ecommerce.cart.client.UserClient;
import com.ecommerce.cart.client.UserResponse;
import com.ecommerce.cart.entity.Cart;
import com.ecommerce.cart.exception.InsufficientStockException;
import com.ecommerce.cart.exception.UserNotFoundException;
import com.ecommerce.cart.repository.CartRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final ProductClient productClient;
    private final UserClient userClient;

    public CartService(CartRepository cartRepository,
                       ProductClient productClient,
                       UserClient userClient) {
        this.cartRepository = cartRepository;
        this.productClient = productClient;
        this.userClient = userClient;
    }

    public Cart addToCart(Cart cart) {

        // Check whether user exists
        UserResponse user =
                userClient.getUserById(cart.getUserId());

        if (user == null) {
            throw new UserNotFoundException("User not found");
        }

        // Check whether product exists
        ProductResponse product =
                productClient.getProductById(cart.getProductId());

        if (product == null) {
            throw new RuntimeException("Product not found");
        }

        // Check whether enough stock is available
        boolean stockAvailable =
                productClient.isStockAvailable(
                        cart.getProductId(),
                        cart.getQuantity()
                );

        if (!stockAvailable) {
            throw new InsufficientStockException("Insufficient stock");
        }

        // Check whether product already exists in user's cart
        Cart existingCart = cartRepository
                .findByUserIdAndProductId(
                        cart.getUserId(),
                        cart.getProductId()
                )
                .orElse(null);

        if (existingCart != null) {

            existingCart.setQuantity(
                    existingCart.getQuantity() + cart.getQuantity()
            );

            return cartRepository.save(existingCart);
        }

        return cartRepository.save(cart);
    }

    public List<Cart> getAllCartItems() {
        return cartRepository.findAll();
    }

    public List<Cart> getCartByUserId(Long userId) {
        return cartRepository.findByUserId(userId);
    }

    public Cart getCartItemById(Long id) {
        return cartRepository.findById(id).orElse(null);
    }

    public void deleteCartItem(Long id) {
        cartRepository.deleteById(id);
    }

    public Cart updateCartQuantity(Long id, Integer quantity) {

        Cart cart = cartRepository.findById(id).orElse(null);

        if (cart == null) {
            return null;
        }

        boolean stockAvailable =
                productClient.isStockAvailable(
                        cart.getProductId(),
                        quantity
                );

        if (!stockAvailable) {
            throw new InsufficientStockException("Insufficient stock");
        }

        cart.setQuantity(quantity);

        return cartRepository.save(cart);
    }
}