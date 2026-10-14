
package com.ecommerce.payment.service;

import com.ecommerce.payment.client.OrderClient;
import com.ecommerce.payment.client.OrderResponse;
import com.ecommerce.payment.entity.Payment;
import com.ecommerce.payment.repository.PaymentRepository;
import feign.FeignException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final OrderClient orderClient;

    public PaymentService(
            PaymentRepository paymentRepository,
            OrderClient orderClient) {
        this.paymentRepository = paymentRepository;
        this.orderClient = orderClient;
    }

    public Payment createPayment(Payment payment) {

        if (payment.getOrderId() == null) {
            throw new IllegalArgumentException(
                    "Order ID is required");
        }

        // Verify the order with Order Service
        OrderResponse order;

        try {
            order = orderClient.getOrderById(
                    payment.getOrderId());

        } catch (FeignException.NotFound ex) {
            throw new IllegalArgumentException(
                    "Order not found: " + payment.getOrderId());

        } catch (FeignException ex) {
            throw new IllegalStateException(
                    "Unable to contact Order Service. HTTP status: "
                            + ex.status(), ex);
        }

        if (order == null || order.getId() == null) {
            throw new IllegalArgumentException(
                    "Order not found: " + payment.getOrderId());
        }

        if (order.getTotalPrice() == null
                || order.getTotalPrice() <= 0) {
            throw new IllegalArgumentException(
                    "Order total must be greater than zero");
        }

        // Calculate amount from the verified order
        payment.setAmount(order.getTotalPrice());

        // This is a simulated payment, not a real transaction
        payment.setPaymentMethod(
                payment.getPaymentMethod() == null
                        ? "SIMULATED"
                        : payment.getPaymentMethod());

        payment.setPaymentStatus("PENDING");

        return paymentRepository.save(payment);
    }

    public OrderResponse getOrder(Long id) {
        return orderClient.getOrderById(id);
    }

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Payment getPaymentById(Long id) {
        return paymentRepository.findById(id).orElse(null);
    }

    public void deletePayment(Long id) {
        paymentRepository.deleteById(id);
    }
}
