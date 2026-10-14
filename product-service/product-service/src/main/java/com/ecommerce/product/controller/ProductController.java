package com.ecommerce.product.controller;

import com.ecommerce.product.entity.Product;
import com.ecommerce.product.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productService.createProduct(product);
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }
    @GetMapping("/{id}/stock")
    public boolean isStockAvailable(
            @PathVariable Long id,
            @RequestParam Integer quantity) {

        return productService.isStockAvailable(id, quantity);
    }

    @PutMapping("/{id}/reduce-stock")
    public Product reduceStock(
            @PathVariable Long id,
            @RequestParam Integer quantity) {

        return productService.reduceStock(id, quantity);
    }

}