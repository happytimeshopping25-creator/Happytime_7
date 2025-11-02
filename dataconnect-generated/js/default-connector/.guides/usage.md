# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { upsertCustomer, createProductReview, createOrder, updateOrderByPaymentIntentId, updateOrderByChargeId, createOrderItem, listCustomers, getReviewsByHandle, getProductByHandle, getCollectionByHandle } from '@firebasegen/default-connector';


// Operation UpsertCustomer:  For variables, look at type UpsertCustomerVars in ../index.d.ts
const { data } = await UpsertCustomer(dataConnect, upsertCustomerVars);

// Operation CreateProductReview:  For variables, look at type CreateProductReviewVars in ../index.d.ts
const { data } = await CreateProductReview(dataConnect, createProductReviewVars);

// Operation CreateOrder:  For variables, look at type CreateOrderVars in ../index.d.ts
const { data } = await CreateOrder(dataConnect, createOrderVars);

// Operation UpdateOrderByPaymentIntentId:  For variables, look at type UpdateOrderByPaymentIntentIdVars in ../index.d.ts
const { data } = await UpdateOrderByPaymentIntentId(dataConnect, updateOrderByPaymentIntentIdVars);

// Operation UpdateOrderByChargeId:  For variables, look at type UpdateOrderByChargeIdVars in ../index.d.ts
const { data } = await UpdateOrderByChargeId(dataConnect, updateOrderByChargeIdVars);

// Operation CreateOrderItem:  For variables, look at type CreateOrderItemVars in ../index.d.ts
const { data } = await CreateOrderItem(dataConnect, createOrderItemVars);

// Operation ListCustomers: 
const { data } = await ListCustomers(dataConnect);

// Operation GetReviewsByHandle:  For variables, look at type GetReviewsByHandleVars in ../index.d.ts
const { data } = await GetReviewsByHandle(dataConnect, getReviewsByHandleVars);

// Operation GetProductByHandle:  For variables, look at type GetProductByHandleVars in ../index.d.ts
const { data } = await GetProductByHandle(dataConnect, getProductByHandleVars);

// Operation GetCollectionByHandle:  For variables, look at type GetCollectionByHandleVars in ../index.d.ts
const { data } = await GetCollectionByHandle(dataConnect, getCollectionByHandleVars);


```