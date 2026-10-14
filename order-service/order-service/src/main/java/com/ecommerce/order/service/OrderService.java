package com.ecommerce.order.service;

import com.ecommerce.order.client.ProductClient;
import com.ecommerce.order.client.ProductResponse;
import com.ecommerce.order.entity.Order;
import com.ecommerce.order.repository.OrderRepository;
import org.springframework.stereotype.Service;
import com.ecommerce.order.exception.InsufficientStockException;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductClient productClient;

    public OrderService(OrderRepository orderRepository,
                        ProductClient productClient) {
        this.orderRepository = orderRepository;
        this.productClient = productClient;
    }


    public Order createOrder(Order order) {

        if (order.getQuantity() == null || order.getQuantity() <= 0) {
            throw new IllegalArgumentException(
                    "Quantity must be greater than zero");
        }

        ProductResponse product =
                productClient.getProductById(order.getProductId());

        if (product == null) {
            throw new RuntimeException("Product not found");
        }

        boolean stockAvailable =
                productClient.isStockAvailable(
                        order.getProductId(),
                        order.getQuantity());

        if (!stockAvailable) {
            throw new InsufficientStockException("Insufficient stock");
        }

        double totalPrice =
                product.getPrice() * order.getQuantity();

        order.setTotalPrice(totalPrice);

        productClient.reduceStock(
                order.getProductId(),
                order.getQuantity());

        return orderRepository.save(order);
    }


    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }

    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
    public List<Order> getOrdersByProductId(Long productId) {
        return orderRepository.findByProductId(productId);
    }
}