package com.ecommerce.order.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
@FeignClient(name = "product-service")
public interface ProductClient {

    @GetMapping("/api/products/{id}")
    ProductResponse getProductById(@PathVariable Long id);

    @GetMapping("/api/products/{id}/stock")
    boolean isStockAvailable(
            @PathVariable Long id,
            @RequestParam Integer quantity);

    @PutMapping("/api/products/{id}/reduce-stock")
    ProductResponse reduceStock(
            @PathVariable Long id,
            @RequestParam Integer quantity);

}