                package com.ecommerce.order.controller;

                import com.ecommerce.order.client.ProductClient;
                import com.ecommerce.order.client.ProductResponse;
                import com.ecommerce.order.entity.Order;
                import com.ecommerce.order.service.OrderService;
                import org.springframework.web.bind.annotation.*;
                import jakarta.validation.Valid;
                import java.util.List;

                @RestController
                @RequestMapping("/api/orders")
                public class OrderController {

                    private final OrderService orderService;
                    private final ProductClient productClient;

                    public OrderController(OrderService orderService,
                                           ProductClient productClient) {
                        this.orderService = orderService;
                        this.productClient = productClient;
                    }

                    // Create Order
                    @PostMapping
                    public Order createOrder(@Valid @RequestBody Order order) {
                        return orderService.createOrder(order);
                    }

                    // Get All Orders
                    @GetMapping
                    public List<Order> getAllOrders() {
                        return orderService.getAllOrders();
                    }

                    // Get Order By ID
                    @GetMapping("/{id}")
                    public Order getOrderById(@PathVariable Long id) {
                        return orderService.getOrderById(id);
                    }

                    // Delete Order
                    @DeleteMapping("/{id}")
                    public String deleteOrder(@PathVariable Long id) {
                        orderService.deleteOrder(id);
                        return "Order deleted successfully";
                    }

                    // Get Product From Product Service using OpenFeign
                    @GetMapping("/by-product/{productId}")
                    public List<Order> getOrdersByProductId(
                            @PathVariable Long productId) {
                        return orderService.getOrdersByProductId(productId);
                    }
                }