# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `default`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListCustomers*](#listcustomers)
  - [*GetReviewsByHandle*](#getreviewsbyhandle)
  - [*GetProductByHandle*](#getproductbyhandle)
  - [*GetCollectionByHandle*](#getcollectionbyhandle)
  - [*GetCollectionsByPage*](#getcollectionsbypage)
  - [*SearchProductDescriptionUsingL2Similarity*](#searchproductdescriptionusingl2similarity)
  - [*SearchProductTitleUsingL2Similarity*](#searchproducttitleusingl2similarity)
  - [*SearchProductReviewContentUsingL2Similarity*](#searchproductreviewcontentusingl2similarity)
  - [*GetOrdersByCustomerId*](#getordersbycustomerid)
  - [*GetOrderById*](#getorderbyid)
- [**Mutations**](#mutations)
  - [*UpsertCustomer*](#upsertcustomer)
  - [*CreateProductReview*](#createproductreview)
  - [*CreateOrder*](#createorder)
  - [*UpdateOrderByPaymentIntentId*](#updateorderbypaymentintentid)
  - [*UpdateOrderByChargeId*](#updateorderbychargeid)
  - [*CreateOrderItem*](#createorderitem)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `default`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@firebasegen/default-connector` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListCustomers
You can execute the `ListCustomers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
listCustomers(): QueryPromise<ListCustomersData, undefined>;

interface ListCustomersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListCustomersData, undefined>;
}
export const listCustomersRef: ListCustomersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listCustomers(dc: DataConnect): QueryPromise<ListCustomersData, undefined>;

interface ListCustomersRef {
  ...
  (dc: DataConnect): QueryRef<ListCustomersData, undefined>;
}
export const listCustomersRef: ListCustomersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listCustomersRef:
```typescript
const name = listCustomersRef.operationName;
console.log(name);
```

### Variables
The `ListCustomers` query has no variables.
### Return Type
Recall that executing the `ListCustomers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListCustomersData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListCustomersData {
  customers: ({
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  } & Customer_Key)[];
}
```
### Using `ListCustomers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listCustomers } from '@firebasegen/default-connector';


// Call the `listCustomers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listCustomers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listCustomers(dataConnect);

console.log(data.customers);

// Or, you can use the `Promise` API.
listCustomers().then((response) => {
  const data = response.data;
  console.log(data.customers);
});
```

### Using `ListCustomers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listCustomersRef } from '@firebasegen/default-connector';


// Call the `listCustomersRef()` function to get a reference to the query.
const ref = listCustomersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listCustomersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.customers);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.customers);
});
```

## GetReviewsByHandle
You can execute the `GetReviewsByHandle` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
getReviewsByHandle(vars: GetReviewsByHandleVariables): QueryPromise<GetReviewsByHandleData, GetReviewsByHandleVariables>;

interface GetReviewsByHandleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetReviewsByHandleVariables): QueryRef<GetReviewsByHandleData, GetReviewsByHandleVariables>;
}
export const getReviewsByHandleRef: GetReviewsByHandleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getReviewsByHandle(dc: DataConnect, vars: GetReviewsByHandleVariables): QueryPromise<GetReviewsByHandleData, GetReviewsByHandleVariables>;

interface GetReviewsByHandleRef {
  ...
  (dc: DataConnect, vars: GetReviewsByHandleVariables): QueryRef<GetReviewsByHandleData, GetReviewsByHandleVariables>;
}
export const getReviewsByHandleRef: GetReviewsByHandleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getReviewsByHandleRef:
```typescript
const name = getReviewsByHandleRef.operationName;
console.log(name);
```

### Variables
The `GetReviewsByHandle` query requires an argument of type `GetReviewsByHandleVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetReviewsByHandleVariables {
  handle: string;
}
```
### Return Type
Recall that executing the `GetReviewsByHandle` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetReviewsByHandleData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetReviewsByHandleData {
  products: ({
    productReviews_on_product: ({
      id: UUIDString;
      rating: number;
      content: string;
      date: DateString;
      customer: {
        id: string;
        firstName: string;
        lastName: string;
      } & Customer_Key;
    })[];
  })[];
}
```
### Using `GetReviewsByHandle`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getReviewsByHandle, GetReviewsByHandleVariables } from '@firebasegen/default-connector';

// The `GetReviewsByHandle` query requires an argument of type `GetReviewsByHandleVariables`:
const getReviewsByHandleVars: GetReviewsByHandleVariables = {
  handle: ..., 
};

// Call the `getReviewsByHandle()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getReviewsByHandle(getReviewsByHandleVars);
// Variables can be defined inline as well.
const { data } = await getReviewsByHandle({ handle: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getReviewsByHandle(dataConnect, getReviewsByHandleVars);

console.log(data.products);

// Or, you can use the `Promise` API.
getReviewsByHandle(getReviewsByHandleVars).then((response) => {
  const data = response.data;
  console.log(data.products);
});
```

### Using `GetReviewsByHandle`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getReviewsByHandleRef, GetReviewsByHandleVariables } from '@firebasegen/default-connector';

// The `GetReviewsByHandle` query requires an argument of type `GetReviewsByHandleVariables`:
const getReviewsByHandleVars: GetReviewsByHandleVariables = {
  handle: ..., 
};

// Call the `getReviewsByHandleRef()` function to get a reference to the query.
const ref = getReviewsByHandleRef(getReviewsByHandleVars);
// Variables can be defined inline as well.
const ref = getReviewsByHandleRef({ handle: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getReviewsByHandleRef(dataConnect, getReviewsByHandleVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.products);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.products);
});
```

## GetProductByHandle
You can execute the `GetProductByHandle` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
getProductByHandle(vars: GetProductByHandleVariables): QueryPromise<GetProductByHandleData, GetProductByHandleVariables>;

interface GetProductByHandleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetProductByHandleVariables): QueryRef<GetProductByHandleData, GetProductByHandleVariables>;
}
export const getProductByHandleRef: GetProductByHandleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getProductByHandle(dc: DataConnect, vars: GetProductByHandleVariables): QueryPromise<GetProductByHandleData, GetProductByHandleVariables>;

interface GetProductByHandleRef {
  ...
  (dc: DataConnect, vars: GetProductByHandleVariables): QueryRef<GetProductByHandleData, GetProductByHandleVariables>;
}
export const getProductByHandleRef: GetProductByHandleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getProductByHandleRef:
```typescript
const name = getProductByHandleRef.operationName;
console.log(name);
```

### Variables
The `GetProductByHandle` query requires an argument of type `GetProductByHandleVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetProductByHandleVariables {
  handle: string;
}
```
### Return Type
Recall that executing the `GetProductByHandle` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetProductByHandleData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetProductByHandleData {
  product?: {
    id: UUIDString;
    title: string;
    description?: string | null;
    handle: string;
    availableForSale: boolean;
    createdAt: DateString;
    updatedAt: DateString;
    featuredImage?: {
      url: string;
      width: number;
      height: number;
      altText?: string | null;
    };
      seo?: {
        title: string;
        description: string;
        keywords: string;
      };
        productVariants_on_product: ({
          id: UUIDString;
          price: number;
          availableForSale: boolean;
          inventoryQuantity: number;
          selectedOptions_on_productVariant: ({
            name?: string | null;
            value?: string | null;
          })[];
        } & ProductVariant_Key)[];
          productImages_on_product: ({
            id: UUIDString;
            url: string;
            altText?: string | null;
            width: number;
            height: number;
            displayPosition: number;
          } & ProductImage_Key)[];
  } & Product_Key;
}
```
### Using `GetProductByHandle`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getProductByHandle, GetProductByHandleVariables } from '@firebasegen/default-connector';

// The `GetProductByHandle` query requires an argument of type `GetProductByHandleVariables`:
const getProductByHandleVars: GetProductByHandleVariables = {
  handle: ..., 
};

// Call the `getProductByHandle()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getProductByHandle(getProductByHandleVars);
// Variables can be defined inline as well.
const { data } = await getProductByHandle({ handle: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getProductByHandle(dataConnect, getProductByHandleVars);

console.log(data.product);

// Or, you can use the `Promise` API.
getProductByHandle(getProductByHandleVars).then((response) => {
  const data = response.data;
  console.log(data.product);
});
```

### Using `GetProductByHandle`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getProductByHandleRef, GetProductByHandleVariables } from '@firebasegen/default-connector';

// The `GetProductByHandle` query requires an argument of type `GetProductByHandleVariables`:
const getProductByHandleVars: GetProductByHandleVariables = {
  handle: ..., 
};

// Call the `getProductByHandleRef()` function to get a reference to the query.
const ref = getProductByHandleRef(getProductByHandleVars);
// Variables can be defined inline as well.
const ref = getProductByHandleRef({ handle: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getProductByHandleRef(dataConnect, getProductByHandleVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.product);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.product);
});
```

## GetCollectionByHandle
You can execute the `GetCollectionByHandle` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
getCollectionByHandle(vars: GetCollectionByHandleVariables): QueryPromise<GetCollectionByHandleData, GetCollectionByHandleVariables>;

interface GetCollectionByHandleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCollectionByHandleVariables): QueryRef<GetCollectionByHandleData, GetCollectionByHandleVariables>;
}
export const getCollectionByHandleRef: GetCollectionByHandleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCollectionByHandle(dc: DataConnect, vars: GetCollectionByHandleVariables): QueryPromise<GetCollectionByHandleData, GetCollectionByHandleVariables>;

interface GetCollectionByHandleRef {
  ...
  (dc: DataConnect, vars: GetCollectionByHandleVariables): QueryRef<GetCollectionByHandleData, GetCollectionByHandleVariables>;
}
export const getCollectionByHandleRef: GetCollectionByHandleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCollectionByHandleRef:
```typescript
const name = getCollectionByHandleRef.operationName;
console.log(name);
```

### Variables
The `GetCollectionByHandle` query requires an argument of type `GetCollectionByHandleVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetCollectionByHandleVariables {
  handle: string;
  page?: string | null;
}
```
### Return Type
Recall that executing the `GetCollectionByHandle` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCollectionByHandleData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetCollectionByHandleData {
  collections: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    page?: string | null;
    featuredImage?: {
      url: string;
      width: number;
      height: number;
      altText?: string | null;
    };
      seo?: {
        title: string;
        description: string;
        keywords: string;
      };
        products_via_ProductCollection: ({
          id: UUIDString;
          title: string;
          handle: string;
          description?: string | null;
          availableForSale: boolean;
          createdAt: DateString;
          updatedAt: DateString;
          productVariants_on_product: ({
            id: UUIDString;
            price: number;
            availableForSale: boolean;
            inventoryQuantity: number;
            selectedOptions_on_productVariant: ({
              name?: string | null;
              value?: string | null;
            })[];
          } & ProductVariant_Key)[];
            productImages_on_product: ({
              id: UUIDString;
              url: string;
              altText?: string | null;
              width: number;
              height: number;
              displayPosition: number;
            } & ProductImage_Key)[];
        } & Product_Key)[];
  } & Collection_Key)[];
}
```
### Using `GetCollectionByHandle`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCollectionByHandle, GetCollectionByHandleVariables } from '@firebasegen/default-connector';

// The `GetCollectionByHandle` query requires an argument of type `GetCollectionByHandleVariables`:
const getCollectionByHandleVars: GetCollectionByHandleVariables = {
  handle: ..., 
  page: ..., // optional
};

// Call the `getCollectionByHandle()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCollectionByHandle(getCollectionByHandleVars);
// Variables can be defined inline as well.
const { data } = await getCollectionByHandle({ handle: ..., page: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCollectionByHandle(dataConnect, getCollectionByHandleVars);

console.log(data.collections);

// Or, you can use the `Promise` API.
getCollectionByHandle(getCollectionByHandleVars).then((response) => {
  const data = response.data;
  console.log(data.collections);
});
```

### Using `GetCollectionByHandle`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCollectionByHandleRef, GetCollectionByHandleVariables } from '@firebasegen/default-connector';

// The `GetCollectionByHandle` query requires an argument of type `GetCollectionByHandleVariables`:
const getCollectionByHandleVars: GetCollectionByHandleVariables = {
  handle: ..., 
  page: ..., // optional
};

// Call the `getCollectionByHandleRef()` function to get a reference to the query.
const ref = getCollectionByHandleRef(getCollectionByHandleVars);
// Variables can be defined inline as well.
const ref = getCollectionByHandleRef({ handle: ..., page: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCollectionByHandleRef(dataConnect, getCollectionByHandleVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.collections);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.collections);
});
```

## GetCollectionsByPage
You can execute the `GetCollectionsByPage` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
getCollectionsByPage(vars?: GetCollectionsByPageVariables): QueryPromise<GetCollectionsByPageData, GetCollectionsByPageVariables>;

interface GetCollectionsByPageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: GetCollectionsByPageVariables): QueryRef<GetCollectionsByPageData, GetCollectionsByPageVariables>;
}
export const getCollectionsByPageRef: GetCollectionsByPageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCollectionsByPage(dc: DataConnect, vars?: GetCollectionsByPageVariables): QueryPromise<GetCollectionsByPageData, GetCollectionsByPageVariables>;

interface GetCollectionsByPageRef {
  ...
  (dc: DataConnect, vars?: GetCollectionsByPageVariables): QueryRef<GetCollectionsByPageData, GetCollectionsByPageVariables>;
}
export const getCollectionsByPageRef: GetCollectionsByPageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCollectionsByPageRef:
```typescript
const name = getCollectionsByPageRef.operationName;
console.log(name);
```

### Variables
The `GetCollectionsByPage` query has an optional argument of type `GetCollectionsByPageVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetCollectionsByPageVariables {
  page?: string | null;
}
```
### Return Type
Recall that executing the `GetCollectionsByPage` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCollectionsByPageData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetCollectionsByPageData {
  collections: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    handle: string;
    page?: string | null;
    featuredImage?: {
      url: string;
      width: number;
      height: number;
      altText?: string | null;
    };
      products_via_ProductCollection: ({
        id: UUIDString;
        title: string;
        handle: string;
        description?: string | null;
        productVariants_on_product: ({
          id: UUIDString;
          price: number;
          selectedOptions_on_productVariant: ({
            name?: string | null;
            value?: string | null;
          })[];
        } & ProductVariant_Key)[];
          productImages_on_product: ({
            id: UUIDString;
            url: string;
            altText?: string | null;
            width: number;
            height: number;
            displayPosition: number;
          } & ProductImage_Key)[];
      } & Product_Key)[];
  } & Collection_Key)[];
}
```
### Using `GetCollectionsByPage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCollectionsByPage, GetCollectionsByPageVariables } from '@firebasegen/default-connector';

// The `GetCollectionsByPage` query has an optional argument of type `GetCollectionsByPageVariables`:
const getCollectionsByPageVars: GetCollectionsByPageVariables = {
  page: ..., // optional
};

// Call the `getCollectionsByPage()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCollectionsByPage(getCollectionsByPageVars);
// Variables can be defined inline as well.
const { data } = await getCollectionsByPage({ page: ..., });
// Since all variables are optional for this query, you can omit the `GetCollectionsByPageVariables` argument.
const { data } = await getCollectionsByPage();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCollectionsByPage(dataConnect, getCollectionsByPageVars);

console.log(data.collections);

// Or, you can use the `Promise` API.
getCollectionsByPage(getCollectionsByPageVars).then((response) => {
  const data = response.data;
  console.log(data.collections);
});
```

### Using `GetCollectionsByPage`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCollectionsByPageRef, GetCollectionsByPageVariables } from '@firebasegen/default-connector';

// The `GetCollectionsByPage` query has an optional argument of type `GetCollectionsByPageVariables`:
const getCollectionsByPageVars: GetCollectionsByPageVariables = {
  page: ..., // optional
};

// Call the `getCollectionsByPageRef()` function to get a reference to the query.
const ref = getCollectionsByPageRef(getCollectionsByPageVars);
// Variables can be defined inline as well.
const ref = getCollectionsByPageRef({ page: ..., });
// Since all variables are optional for this query, you can omit the `GetCollectionsByPageVariables` argument.
const ref = getCollectionsByPageRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCollectionsByPageRef(dataConnect, getCollectionsByPageVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.collections);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.collections);
});
```

## SearchProductDescriptionUsingL2Similarity
You can execute the `SearchProductDescriptionUsingL2Similarity` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
searchProductDescriptionUsingL2similarity(vars: SearchProductDescriptionUsingL2similarityVariables): QueryPromise<SearchProductDescriptionUsingL2similarityData, SearchProductDescriptionUsingL2similarityVariables>;

interface SearchProductDescriptionUsingL2similarityRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SearchProductDescriptionUsingL2similarityVariables): QueryRef<SearchProductDescriptionUsingL2similarityData, SearchProductDescriptionUsingL2similarityVariables>;
}
export const searchProductDescriptionUsingL2similarityRef: SearchProductDescriptionUsingL2similarityRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
searchProductDescriptionUsingL2similarity(dc: DataConnect, vars: SearchProductDescriptionUsingL2similarityVariables): QueryPromise<SearchProductDescriptionUsingL2similarityData, SearchProductDescriptionUsingL2similarityVariables>;

interface SearchProductDescriptionUsingL2similarityRef {
  ...
  (dc: DataConnect, vars: SearchProductDescriptionUsingL2similarityVariables): QueryRef<SearchProductDescriptionUsingL2similarityData, SearchProductDescriptionUsingL2similarityVariables>;
}
export const searchProductDescriptionUsingL2similarityRef: SearchProductDescriptionUsingL2similarityRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the searchProductDescriptionUsingL2similarityRef:
```typescript
const name = searchProductDescriptionUsingL2similarityRef.operationName;
console.log(name);
```

### Variables
The `SearchProductDescriptionUsingL2Similarity` query requires an argument of type `SearchProductDescriptionUsingL2similarityVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SearchProductDescriptionUsingL2similarityVariables {
  query: string;
}
```
### Return Type
Recall that executing the `SearchProductDescriptionUsingL2Similarity` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SearchProductDescriptionUsingL2similarityData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SearchProductDescriptionUsingL2similarityData {
  products_descriptionEmbedding_similarity: ({
    id: UUIDString;
    handle: string;
    title: string;
  } & Product_Key)[];
}
```
### Using `SearchProductDescriptionUsingL2Similarity`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, searchProductDescriptionUsingL2similarity, SearchProductDescriptionUsingL2similarityVariables } from '@firebasegen/default-connector';

// The `SearchProductDescriptionUsingL2Similarity` query requires an argument of type `SearchProductDescriptionUsingL2similarityVariables`:
const searchProductDescriptionUsingL2similarityVars: SearchProductDescriptionUsingL2similarityVariables = {
  query: ..., 
};

// Call the `searchProductDescriptionUsingL2similarity()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await searchProductDescriptionUsingL2similarity(searchProductDescriptionUsingL2similarityVars);
// Variables can be defined inline as well.
const { data } = await searchProductDescriptionUsingL2similarity({ query: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await searchProductDescriptionUsingL2similarity(dataConnect, searchProductDescriptionUsingL2similarityVars);

console.log(data.products_descriptionEmbedding_similarity);

// Or, you can use the `Promise` API.
searchProductDescriptionUsingL2similarity(searchProductDescriptionUsingL2similarityVars).then((response) => {
  const data = response.data;
  console.log(data.products_descriptionEmbedding_similarity);
});
```

### Using `SearchProductDescriptionUsingL2Similarity`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, searchProductDescriptionUsingL2similarityRef, SearchProductDescriptionUsingL2similarityVariables } from '@firebasegen/default-connector';

// The `SearchProductDescriptionUsingL2Similarity` query requires an argument of type `SearchProductDescriptionUsingL2similarityVariables`:
const searchProductDescriptionUsingL2similarityVars: SearchProductDescriptionUsingL2similarityVariables = {
  query: ..., 
};

// Call the `searchProductDescriptionUsingL2similarityRef()` function to get a reference to the query.
const ref = searchProductDescriptionUsingL2similarityRef(searchProductDescriptionUsingL2similarityVars);
// Variables can be defined inline as well.
const ref = searchProductDescriptionUsingL2similarityRef({ query: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = searchProductDescriptionUsingL2similarityRef(dataConnect, searchProductDescriptionUsingL2similarityVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.products_descriptionEmbedding_similarity);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.products_descriptionEmbedding_similarity);
});
```

## SearchProductTitleUsingL2Similarity
You can execute the `SearchProductTitleUsingL2Similarity` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
searchProductTitleUsingL2similarity(vars: SearchProductTitleUsingL2similarityVariables): QueryPromise<SearchProductTitleUsingL2similarityData, SearchProductTitleUsingL2similarityVariables>;

interface SearchProductTitleUsingL2similarityRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SearchProductTitleUsingL2similarityVariables): QueryRef<SearchProductTitleUsingL2similarityData, SearchProductTitleUsingL2similarityVariables>;
}
export const searchProductTitleUsingL2similarityRef: SearchProductTitleUsingL2similarityRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
searchProductTitleUsingL2similarity(dc: DataConnect, vars: SearchProductTitleUsingL2similarityVariables): QueryPromise<SearchProductTitleUsingL2similarityData, SearchProductTitleUsingL2similarityVariables>;

interface SearchProductTitleUsingL2similarityRef {
  ...
  (dc: DataConnect, vars: SearchProductTitleUsingL2similarityVariables): QueryRef<SearchProductTitleUsingL2similarityData, SearchProductTitleUsingL2similarityVariables>;
}
export const searchProductTitleUsingL2similarityRef: SearchProductTitleUsingL2similarityRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the searchProductTitleUsingL2similarityRef:
```typescript
const name = searchProductTitleUsingL2similarityRef.operationName;
console.log(name);
```

### Variables
The `SearchProductTitleUsingL2Similarity` query requires an argument of type `SearchProductTitleUsingL2similarityVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SearchProductTitleUsingL2similarityVariables {
  query: string;
}
```
### Return Type
Recall that executing the `SearchProductTitleUsingL2Similarity` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SearchProductTitleUsingL2similarityData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SearchProductTitleUsingL2similarityData {
  products_titleEmbedding_similarity: ({
    id: UUIDString;
    handle: string;
    title: string;
  } & Product_Key)[];
}
```
### Using `SearchProductTitleUsingL2Similarity`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, searchProductTitleUsingL2similarity, SearchProductTitleUsingL2similarityVariables } from '@firebasegen/default-connector';

// The `SearchProductTitleUsingL2Similarity` query requires an argument of type `SearchProductTitleUsingL2similarityVariables`:
const searchProductTitleUsingL2similarityVars: SearchProductTitleUsingL2similarityVariables = {
  query: ..., 
};

// Call the `searchProductTitleUsingL2similarity()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await searchProductTitleUsingL2similarity(searchProductTitleUsingL2similarityVars);
// Variables can be defined inline as well.
const { data } = await searchProductTitleUsingL2similarity({ query: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await searchProductTitleUsingL2similarity(dataConnect, searchProductTitleUsingL2similarityVars);

console.log(data.products_titleEmbedding_similarity);

// Or, you can use the `Promise` API.
searchProductTitleUsingL2similarity(searchProductTitleUsingL2similarityVars).then((response) => {
  const data = response.data;
  console.log(data.products_titleEmbedding_similarity);
});
```

### Using `SearchProductTitleUsingL2Similarity`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, searchProductTitleUsingL2similarityRef, SearchProductTitleUsingL2similarityVariables } from '@firebasegen/default-connector';

// The `SearchProductTitleUsingL2Similarity` query requires an argument of type `SearchProductTitleUsingL2similarityVariables`:
const searchProductTitleUsingL2similarityVars: SearchProductTitleUsingL2similarityVariables = {
  query: ..., 
};

// Call the `searchProductTitleUsingL2similarityRef()` function to get a reference to the query.
const ref = searchProductTitleUsingL2similarityRef(searchProductTitleUsingL2similarityVars);
// Variables can be defined inline as well.
const ref = searchProductTitleUsingL2similarityRef({ query: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = searchProductTitleUsingL2similarityRef(dataConnect, searchProductTitleUsingL2similarityVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.products_titleEmbedding_similarity);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.products_titleEmbedding_similarity);
});
```

## SearchProductReviewContentUsingL2Similarity
You can execute the `SearchProductReviewContentUsingL2Similarity` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
searchProductReviewContentUsingL2similarity(vars: SearchProductReviewContentUsingL2similarityVariables): QueryPromise<SearchProductReviewContentUsingL2similarityData, SearchProductReviewContentUsingL2similarityVariables>;

interface SearchProductReviewContentUsingL2similarityRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SearchProductReviewContentUsingL2similarityVariables): QueryRef<SearchProductReviewContentUsingL2similarityData, SearchProductReviewContentUsingL2similarityVariables>;
}
export const searchProductReviewContentUsingL2similarityRef: SearchProductReviewContentUsingL2similarityRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
searchProductReviewContentUsingL2similarity(dc: DataConnect, vars: SearchProductReviewContentUsingL2similarityVariables): QueryPromise<SearchProductReviewContentUsingL2similarityData, SearchProductReviewContentUsingL2similarityVariables>;

interface SearchProductReviewContentUsingL2similarityRef {
  ...
  (dc: DataConnect, vars: SearchProductReviewContentUsingL2similarityVariables): QueryRef<SearchProductReviewContentUsingL2similarityData, SearchProductReviewContentUsingL2similarityVariables>;
}
export const searchProductReviewContentUsingL2similarityRef: SearchProductReviewContentUsingL2similarityRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the searchProductReviewContentUsingL2similarityRef:
```typescript
const name = searchProductReviewContentUsingL2similarityRef.operationName;
console.log(name);
```

### Variables
The `SearchProductReviewContentUsingL2Similarity` query requires an argument of type `SearchProductReviewContentUsingL2similarityVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SearchProductReviewContentUsingL2similarityVariables {
  query: string;
}
```
### Return Type
Recall that executing the `SearchProductReviewContentUsingL2Similarity` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SearchProductReviewContentUsingL2similarityData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SearchProductReviewContentUsingL2similarityData {
  productReviews_contentEmbedding_similarity: ({
    product: {
      id: UUIDString;
      title: string;
      handle: string;
    } & Product_Key;
  })[];
}
```
### Using `SearchProductReviewContentUsingL2Similarity`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, searchProductReviewContentUsingL2similarity, SearchProductReviewContentUsingL2similarityVariables } from '@firebasegen/default-connector';

// The `SearchProductReviewContentUsingL2Similarity` query requires an argument of type `SearchProductReviewContentUsingL2similarityVariables`:
const searchProductReviewContentUsingL2similarityVars: SearchProductReviewContentUsingL2similarityVariables = {
  query: ..., 
};

// Call the `searchProductReviewContentUsingL2similarity()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await searchProductReviewContentUsingL2similarity(searchProductReviewContentUsingL2similarityVars);
// Variables can be defined inline as well.
const { data } = await searchProductReviewContentUsingL2similarity({ query: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await searchProductReviewContentUsingL2similarity(dataConnect, searchProductReviewContentUsingL2similarityVars);

console.log(data.productReviews_contentEmbedding_similarity);

// Or, you can use the `Promise` API.
searchProductReviewContentUsingL2similarity(searchProductReviewContentUsingL2similarityVars).then((response) => {
  const data = response.data;
  console.log(data.productReviews_contentEmbedding_similarity);
});
```

### Using `SearchProductReviewContentUsingL2Similarity`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, searchProductReviewContentUsingL2similarityRef, SearchProductReviewContentUsingL2similarityVariables } from '@firebasegen/default-connector';

// The `SearchProductReviewContentUsingL2Similarity` query requires an argument of type `SearchProductReviewContentUsingL2similarityVariables`:
const searchProductReviewContentUsingL2similarityVars: SearchProductReviewContentUsingL2similarityVariables = {
  query: ..., 
};

// Call the `searchProductReviewContentUsingL2similarityRef()` function to get a reference to the query.
const ref = searchProductReviewContentUsingL2similarityRef(searchProductReviewContentUsingL2similarityVars);
// Variables can be defined inline as well.
const ref = searchProductReviewContentUsingL2similarityRef({ query: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = searchProductReviewContentUsingL2similarityRef(dataConnect, searchProductReviewContentUsingL2similarityVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.productReviews_contentEmbedding_similarity);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.productReviews_contentEmbedding_similarity);
});
```

## GetOrdersByCustomerId
You can execute the `GetOrdersByCustomerId` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
getOrdersByCustomerId(vars: GetOrdersByCustomerIdVariables): QueryPromise<GetOrdersByCustomerIdData, GetOrdersByCustomerIdVariables>;

interface GetOrdersByCustomerIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOrdersByCustomerIdVariables): QueryRef<GetOrdersByCustomerIdData, GetOrdersByCustomerIdVariables>;
}
export const getOrdersByCustomerIdRef: GetOrdersByCustomerIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getOrdersByCustomerId(dc: DataConnect, vars: GetOrdersByCustomerIdVariables): QueryPromise<GetOrdersByCustomerIdData, GetOrdersByCustomerIdVariables>;

interface GetOrdersByCustomerIdRef {
  ...
  (dc: DataConnect, vars: GetOrdersByCustomerIdVariables): QueryRef<GetOrdersByCustomerIdData, GetOrdersByCustomerIdVariables>;
}
export const getOrdersByCustomerIdRef: GetOrdersByCustomerIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getOrdersByCustomerIdRef:
```typescript
const name = getOrdersByCustomerIdRef.operationName;
console.log(name);
```

### Variables
The `GetOrdersByCustomerId` query requires an argument of type `GetOrdersByCustomerIdVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetOrdersByCustomerIdVariables {
  customerId: string;
}
```
### Return Type
Recall that executing the `GetOrdersByCustomerId` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetOrdersByCustomerIdData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetOrdersByCustomerIdData {
  orders?: {
    orders_on_customer: ({
      id: UUIDString;
      customerId: string;
      processedAt: DateString;
      chargeId?: string | null;
      paymentIntentId?: string | null;
      receiptUrl?: string | null;
      subtotalPrice: number;
      totalPrice: number;
      financialStatus: string;
      fulfillmentStatus: string;
      orderItems_on_order: ({
        id: UUIDString;
        quantity: number;
        price: number;
        product: {
          id: UUIDString;
          title: string;
          handle: string;
          productImages_on_product: ({
            url: string;
            altText?: string | null;
            width: number;
            height: number;
          })[];
        } & Product_Key;
      } & OrderItem_Key)[];
    } & Order_Key)[];
  };
}
```
### Using `GetOrdersByCustomerId`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getOrdersByCustomerId, GetOrdersByCustomerIdVariables } from '@firebasegen/default-connector';

// The `GetOrdersByCustomerId` query requires an argument of type `GetOrdersByCustomerIdVariables`:
const getOrdersByCustomerIdVars: GetOrdersByCustomerIdVariables = {
  customerId: ..., 
};

// Call the `getOrdersByCustomerId()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getOrdersByCustomerId(getOrdersByCustomerIdVars);
// Variables can be defined inline as well.
const { data } = await getOrdersByCustomerId({ customerId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getOrdersByCustomerId(dataConnect, getOrdersByCustomerIdVars);

console.log(data.orders);

// Or, you can use the `Promise` API.
getOrdersByCustomerId(getOrdersByCustomerIdVars).then((response) => {
  const data = response.data;
  console.log(data.orders);
});
```

### Using `GetOrdersByCustomerId`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getOrdersByCustomerIdRef, GetOrdersByCustomerIdVariables } from '@firebasegen/default-connector';

// The `GetOrdersByCustomerId` query requires an argument of type `GetOrdersByCustomerIdVariables`:
const getOrdersByCustomerIdVars: GetOrdersByCustomerIdVariables = {
  customerId: ..., 
};

// Call the `getOrdersByCustomerIdRef()` function to get a reference to the query.
const ref = getOrdersByCustomerIdRef(getOrdersByCustomerIdVars);
// Variables can be defined inline as well.
const ref = getOrdersByCustomerIdRef({ customerId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getOrdersByCustomerIdRef(dataConnect, getOrdersByCustomerIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.orders);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.orders);
});
```

## GetOrderById
You can execute the `GetOrderById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
getOrderById(vars: GetOrderByIdVariables): QueryPromise<GetOrderByIdData, GetOrderByIdVariables>;

interface GetOrderByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOrderByIdVariables): QueryRef<GetOrderByIdData, GetOrderByIdVariables>;
}
export const getOrderByIdRef: GetOrderByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getOrderById(dc: DataConnect, vars: GetOrderByIdVariables): QueryPromise<GetOrderByIdData, GetOrderByIdVariables>;

interface GetOrderByIdRef {
  ...
  (dc: DataConnect, vars: GetOrderByIdVariables): QueryRef<GetOrderByIdData, GetOrderByIdVariables>;
}
export const getOrderByIdRef: GetOrderByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getOrderByIdRef:
```typescript
const name = getOrderByIdRef.operationName;
console.log(name);
```

### Variables
The `GetOrderById` query requires an argument of type `GetOrderByIdVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetOrderByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetOrderById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetOrderByIdData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetOrderByIdData {
  order?: {
    id: UUIDString;
    customerId: string;
    processedAt: DateString;
    receiptUrl?: string | null;
    totalPrice: number;
    financialStatus: string;
    fulfillmentStatus: string;
    orderItems_on_order: ({
      id: UUIDString;
      quantity: number;
      price: number;
      product: {
        id: UUIDString;
        title: string;
        handle: string;
        productImages_on_product: ({
          url: string;
          altText?: string | null;
          width: number;
          height: number;
        })[];
      } & Product_Key;
    } & OrderItem_Key)[];
  } & Order_Key;
}
```
### Using `GetOrderById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getOrderById, GetOrderByIdVariables } from '@firebasegen/default-connector';

// The `GetOrderById` query requires an argument of type `GetOrderByIdVariables`:
const getOrderByIdVars: GetOrderByIdVariables = {
  id: ..., 
};

// Call the `getOrderById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getOrderById(getOrderByIdVars);
// Variables can be defined inline as well.
const { data } = await getOrderById({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getOrderById(dataConnect, getOrderByIdVars);

console.log(data.order);

// Or, you can use the `Promise` API.
getOrderById(getOrderByIdVars).then((response) => {
  const data = response.data;
  console.log(data.order);
});
```

### Using `GetOrderById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getOrderByIdRef, GetOrderByIdVariables } from '@firebasegen/default-connector';

// The `GetOrderById` query requires an argument of type `GetOrderByIdVariables`:
const getOrderByIdVars: GetOrderByIdVariables = {
  id: ..., 
};

// Call the `getOrderByIdRef()` function to get a reference to the query.
const ref = getOrderByIdRef(getOrderByIdVars);
// Variables can be defined inline as well.
const ref = getOrderByIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getOrderByIdRef(dataConnect, getOrderByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.order);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.order);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## UpsertCustomer
You can execute the `UpsertCustomer` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
upsertCustomer(vars: UpsertCustomerVariables): MutationPromise<UpsertCustomerData, UpsertCustomerVariables>;

interface UpsertCustomerRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertCustomerVariables): MutationRef<UpsertCustomerData, UpsertCustomerVariables>;
}
export const upsertCustomerRef: UpsertCustomerRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertCustomer(dc: DataConnect, vars: UpsertCustomerVariables): MutationPromise<UpsertCustomerData, UpsertCustomerVariables>;

interface UpsertCustomerRef {
  ...
  (dc: DataConnect, vars: UpsertCustomerVariables): MutationRef<UpsertCustomerData, UpsertCustomerVariables>;
}
export const upsertCustomerRef: UpsertCustomerRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertCustomerRef:
```typescript
const name = upsertCustomerRef.operationName;
console.log(name);
```

### Variables
The `UpsertCustomer` mutation requires an argument of type `UpsertCustomerVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertCustomerVariables {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  acceptsMarketing: boolean;
}
```
### Return Type
Recall that executing the `UpsertCustomer` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertCustomerData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertCustomerData {
  customer_upsert: Customer_Key;
}
```
### Using `UpsertCustomer`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertCustomer, UpsertCustomerVariables } from '@firebasegen/default-connector';

// The `UpsertCustomer` mutation requires an argument of type `UpsertCustomerVariables`:
const upsertCustomerVars: UpsertCustomerVariables = {
  firstName: ..., 
  lastName: ..., 
  email: ..., 
  phone: ..., 
  acceptsMarketing: ..., 
};

// Call the `upsertCustomer()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertCustomer(upsertCustomerVars);
// Variables can be defined inline as well.
const { data } = await upsertCustomer({ firstName: ..., lastName: ..., email: ..., phone: ..., acceptsMarketing: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertCustomer(dataConnect, upsertCustomerVars);

console.log(data.customer_upsert);

// Or, you can use the `Promise` API.
upsertCustomer(upsertCustomerVars).then((response) => {
  const data = response.data;
  console.log(data.customer_upsert);
});
```

### Using `UpsertCustomer`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertCustomerRef, UpsertCustomerVariables } from '@firebasegen/default-connector';

// The `UpsertCustomer` mutation requires an argument of type `UpsertCustomerVariables`:
const upsertCustomerVars: UpsertCustomerVariables = {
  firstName: ..., 
  lastName: ..., 
  email: ..., 
  phone: ..., 
  acceptsMarketing: ..., 
};

// Call the `upsertCustomerRef()` function to get a reference to the mutation.
const ref = upsertCustomerRef(upsertCustomerVars);
// Variables can be defined inline as well.
const ref = upsertCustomerRef({ firstName: ..., lastName: ..., email: ..., phone: ..., acceptsMarketing: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertCustomerRef(dataConnect, upsertCustomerVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.customer_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.customer_upsert);
});
```

## CreateProductReview
You can execute the `CreateProductReview` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
createProductReview(vars: CreateProductReviewVariables): MutationPromise<CreateProductReviewData, CreateProductReviewVariables>;

interface CreateProductReviewRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateProductReviewVariables): MutationRef<CreateProductReviewData, CreateProductReviewVariables>;
}
export const createProductReviewRef: CreateProductReviewRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createProductReview(dc: DataConnect, vars: CreateProductReviewVariables): MutationPromise<CreateProductReviewData, CreateProductReviewVariables>;

interface CreateProductReviewRef {
  ...
  (dc: DataConnect, vars: CreateProductReviewVariables): MutationRef<CreateProductReviewData, CreateProductReviewVariables>;
}
export const createProductReviewRef: CreateProductReviewRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createProductReviewRef:
```typescript
const name = createProductReviewRef.operationName;
console.log(name);
```

### Variables
The `CreateProductReview` mutation requires an argument of type `CreateProductReviewVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateProductReviewVariables {
  productId: UUIDString;
  rating: number;
  content: string;
}
```
### Return Type
Recall that executing the `CreateProductReview` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateProductReviewData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateProductReviewData {
  productReview_insert: ProductReview_Key;
}
```
### Using `CreateProductReview`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createProductReview, CreateProductReviewVariables } from '@firebasegen/default-connector';

// The `CreateProductReview` mutation requires an argument of type `CreateProductReviewVariables`:
const createProductReviewVars: CreateProductReviewVariables = {
  productId: ..., 
  rating: ..., 
  content: ..., 
};

// Call the `createProductReview()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createProductReview(createProductReviewVars);
// Variables can be defined inline as well.
const { data } = await createProductReview({ productId: ..., rating: ..., content: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createProductReview(dataConnect, createProductReviewVars);

console.log(data.productReview_insert);

// Or, you can use the `Promise` API.
createProductReview(createProductReviewVars).then((response) => {
  const data = response.data;
  console.log(data.productReview_insert);
});
```

### Using `CreateProductReview`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createProductReviewRef, CreateProductReviewVariables } from '@firebasegen/default-connector';

// The `CreateProductReview` mutation requires an argument of type `CreateProductReviewVariables`:
const createProductReviewVars: CreateProductReviewVariables = {
  productId: ..., 
  rating: ..., 
  content: ..., 
};

// Call the `createProductReviewRef()` function to get a reference to the mutation.
const ref = createProductReviewRef(createProductReviewVars);
// Variables can be defined inline as well.
const ref = createProductReviewRef({ productId: ..., rating: ..., content: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createProductReviewRef(dataConnect, createProductReviewVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.productReview_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.productReview_insert);
});
```

## CreateOrder
You can execute the `CreateOrder` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
createOrder(vars: CreateOrderVariables): MutationPromise<CreateOrderData, CreateOrderVariables>;

interface CreateOrderRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateOrderVariables): MutationRef<CreateOrderData, CreateOrderVariables>;
}
export const createOrderRef: CreateOrderRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createOrder(dc: DataConnect, vars: CreateOrderVariables): MutationPromise<CreateOrderData, CreateOrderVariables>;

interface CreateOrderRef {
  ...
  (dc: DataConnect, vars: CreateOrderVariables): MutationRef<CreateOrderData, CreateOrderVariables>;
}
export const createOrderRef: CreateOrderRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createOrderRef:
```typescript
const name = createOrderRef.operationName;
console.log(name);
```

### Variables
The `CreateOrder` mutation requires an argument of type `CreateOrderVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateOrderVariables {
  customerId: string;
  chargeId?: string | null;
  paymentIntentId?: string | null;
  receiptUrl?: string | null;
  subtotalPrice: number;
  totalTax: number;
  totalShippingPrice: number;
  totalPrice: number;
  financialStatus: string;
  fulfillmentStatus: string;
}
```
### Return Type
Recall that executing the `CreateOrder` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateOrderData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateOrderData {
  order_insert: Order_Key;
}
```
### Using `CreateOrder`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createOrder, CreateOrderVariables } from '@firebasegen/default-connector';

// The `CreateOrder` mutation requires an argument of type `CreateOrderVariables`:
const createOrderVars: CreateOrderVariables = {
  customerId: ..., 
  chargeId: ..., // optional
  paymentIntentId: ..., // optional
  receiptUrl: ..., // optional
  subtotalPrice: ..., 
  totalTax: ..., 
  totalShippingPrice: ..., 
  totalPrice: ..., 
  financialStatus: ..., 
  fulfillmentStatus: ..., 
};

// Call the `createOrder()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createOrder(createOrderVars);
// Variables can be defined inline as well.
const { data } = await createOrder({ customerId: ..., chargeId: ..., paymentIntentId: ..., receiptUrl: ..., subtotalPrice: ..., totalTax: ..., totalShippingPrice: ..., totalPrice: ..., financialStatus: ..., fulfillmentStatus: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createOrder(dataConnect, createOrderVars);

console.log(data.order_insert);

// Or, you can use the `Promise` API.
createOrder(createOrderVars).then((response) => {
  const data = response.data;
  console.log(data.order_insert);
});
```

### Using `CreateOrder`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createOrderRef, CreateOrderVariables } from '@firebasegen/default-connector';

// The `CreateOrder` mutation requires an argument of type `CreateOrderVariables`:
const createOrderVars: CreateOrderVariables = {
  customerId: ..., 
  chargeId: ..., // optional
  paymentIntentId: ..., // optional
  receiptUrl: ..., // optional
  subtotalPrice: ..., 
  totalTax: ..., 
  totalShippingPrice: ..., 
  totalPrice: ..., 
  financialStatus: ..., 
  fulfillmentStatus: ..., 
};

// Call the `createOrderRef()` function to get a reference to the mutation.
const ref = createOrderRef(createOrderVars);
// Variables can be defined inline as well.
const ref = createOrderRef({ customerId: ..., chargeId: ..., paymentIntentId: ..., receiptUrl: ..., subtotalPrice: ..., totalTax: ..., totalShippingPrice: ..., totalPrice: ..., financialStatus: ..., fulfillmentStatus: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createOrderRef(dataConnect, createOrderVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.order_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.order_insert);
});
```

## UpdateOrderByPaymentIntentId
You can execute the `UpdateOrderByPaymentIntentId` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
updateOrderByPaymentIntentId(vars: UpdateOrderByPaymentIntentIdVariables): MutationPromise<UpdateOrderByPaymentIntentIdData, UpdateOrderByPaymentIntentIdVariables>;

interface UpdateOrderByPaymentIntentIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateOrderByPaymentIntentIdVariables): MutationRef<UpdateOrderByPaymentIntentIdData, UpdateOrderByPaymentIntentIdVariables>;
}
export const updateOrderByPaymentIntentIdRef: UpdateOrderByPaymentIntentIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateOrderByPaymentIntentId(dc: DataConnect, vars: UpdateOrderByPaymentIntentIdVariables): MutationPromise<UpdateOrderByPaymentIntentIdData, UpdateOrderByPaymentIntentIdVariables>;

interface UpdateOrderByPaymentIntentIdRef {
  ...
  (dc: DataConnect, vars: UpdateOrderByPaymentIntentIdVariables): MutationRef<UpdateOrderByPaymentIntentIdData, UpdateOrderByPaymentIntentIdVariables>;
}
export const updateOrderByPaymentIntentIdRef: UpdateOrderByPaymentIntentIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateOrderByPaymentIntentIdRef:
```typescript
const name = updateOrderByPaymentIntentIdRef.operationName;
console.log(name);
```

### Variables
The `UpdateOrderByPaymentIntentId` mutation requires an argument of type `UpdateOrderByPaymentIntentIdVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateOrderByPaymentIntentIdVariables {
  paymentIntentId: string;
  financialStatus?: string | null;
  fulfillmentStatus?: string | null;
  receiptUrl?: string | null;
  processedAt?: DateString | null;
  chargeId?: string | null;
}
```
### Return Type
Recall that executing the `UpdateOrderByPaymentIntentId` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateOrderByPaymentIntentIdData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateOrderByPaymentIntentIdData {
  order_update?: Order_Key | null;
}
```
### Using `UpdateOrderByPaymentIntentId`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateOrderByPaymentIntentId, UpdateOrderByPaymentIntentIdVariables } from '@firebasegen/default-connector';

// The `UpdateOrderByPaymentIntentId` mutation requires an argument of type `UpdateOrderByPaymentIntentIdVariables`:
const updateOrderByPaymentIntentIdVars: UpdateOrderByPaymentIntentIdVariables = {
  paymentIntentId: ..., 
  financialStatus: ..., // optional
  fulfillmentStatus: ..., // optional
  receiptUrl: ..., // optional
  processedAt: ..., // optional
  chargeId: ..., // optional
};

// Call the `updateOrderByPaymentIntentId()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateOrderByPaymentIntentId(updateOrderByPaymentIntentIdVars);
// Variables can be defined inline as well.
const { data } = await updateOrderByPaymentIntentId({ paymentIntentId: ..., financialStatus: ..., fulfillmentStatus: ..., receiptUrl: ..., processedAt: ..., chargeId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateOrderByPaymentIntentId(dataConnect, updateOrderByPaymentIntentIdVars);

console.log(data.order_update);

// Or, you can use the `Promise` API.
updateOrderByPaymentIntentId(updateOrderByPaymentIntentIdVars).then((response) => {
  const data = response.data;
  console.log(data.order_update);
});
```

### Using `UpdateOrderByPaymentIntentId`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateOrderByPaymentIntentIdRef, UpdateOrderByPaymentIntentIdVariables } from '@firebasegen/default-connector';

// The `UpdateOrderByPaymentIntentId` mutation requires an argument of type `UpdateOrderByPaymentIntentIdVariables`:
const updateOrderByPaymentIntentIdVars: UpdateOrderByPaymentIntentIdVariables = {
  paymentIntentId: ..., 
  financialStatus: ..., // optional
  fulfillmentStatus: ..., // optional
  receiptUrl: ..., // optional
  processedAt: ..., // optional
  chargeId: ..., // optional
};

// Call the `updateOrderByPaymentIntentIdRef()` function to get a reference to the mutation.
const ref = updateOrderByPaymentIntentIdRef(updateOrderByPaymentIntentIdVars);
// Variables can be defined inline as well.
const ref = updateOrderByPaymentIntentIdRef({ paymentIntentId: ..., financialStatus: ..., fulfillmentStatus: ..., receiptUrl: ..., processedAt: ..., chargeId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateOrderByPaymentIntentIdRef(dataConnect, updateOrderByPaymentIntentIdVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.order_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.order_update);
});
```

## UpdateOrderByChargeId
You can execute the `UpdateOrderByChargeId` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
updateOrderByChargeId(vars?: UpdateOrderByChargeIdVariables): MutationPromise<UpdateOrderByChargeIdData, UpdateOrderByChargeIdVariables>;

interface UpdateOrderByChargeIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: UpdateOrderByChargeIdVariables): MutationRef<UpdateOrderByChargeIdData, UpdateOrderByChargeIdVariables>;
}
export const updateOrderByChargeIdRef: UpdateOrderByChargeIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateOrderByChargeId(dc: DataConnect, vars?: UpdateOrderByChargeIdVariables): MutationPromise<UpdateOrderByChargeIdData, UpdateOrderByChargeIdVariables>;

interface UpdateOrderByChargeIdRef {
  ...
  (dc: DataConnect, vars?: UpdateOrderByChargeIdVariables): MutationRef<UpdateOrderByChargeIdData, UpdateOrderByChargeIdVariables>;
}
export const updateOrderByChargeIdRef: UpdateOrderByChargeIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateOrderByChargeIdRef:
```typescript
const name = updateOrderByChargeIdRef.operationName;
console.log(name);
```

### Variables
The `UpdateOrderByChargeId` mutation has an optional argument of type `UpdateOrderByChargeIdVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateOrderByChargeIdVariables {
  financialStatus?: string | null;
  fulfillmentStatus?: string | null;
  receiptUrl?: string | null;
  processedAt?: DateString | null;
  chargeId?: string | null;
}
```
### Return Type
Recall that executing the `UpdateOrderByChargeId` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateOrderByChargeIdData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateOrderByChargeIdData {
  order_update?: Order_Key | null;
}
```
### Using `UpdateOrderByChargeId`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateOrderByChargeId, UpdateOrderByChargeIdVariables } from '@firebasegen/default-connector';

// The `UpdateOrderByChargeId` mutation has an optional argument of type `UpdateOrderByChargeIdVariables`:
const updateOrderByChargeIdVars: UpdateOrderByChargeIdVariables = {
  financialStatus: ..., // optional
  fulfillmentStatus: ..., // optional
  receiptUrl: ..., // optional
  processedAt: ..., // optional
  chargeId: ..., // optional
};

// Call the `updateOrderByChargeId()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateOrderByChargeId(updateOrderByChargeIdVars);
// Variables can be defined inline as well.
const { data } = await updateOrderByChargeId({ financialStatus: ..., fulfillmentStatus: ..., receiptUrl: ..., processedAt: ..., chargeId: ..., });
// Since all variables are optional for this mutation, you can omit the `UpdateOrderByChargeIdVariables` argument.
const { data } = await updateOrderByChargeId();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateOrderByChargeId(dataConnect, updateOrderByChargeIdVars);

console.log(data.order_update);

// Or, you can use the `Promise` API.
updateOrderByChargeId(updateOrderByChargeIdVars).then((response) => {
  const data = response.data;
  console.log(data.order_update);
});
```

### Using `UpdateOrderByChargeId`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateOrderByChargeIdRef, UpdateOrderByChargeIdVariables } from '@firebasegen/default-connector';

// The `UpdateOrderByChargeId` mutation has an optional argument of type `UpdateOrderByChargeIdVariables`:
const updateOrderByChargeIdVars: UpdateOrderByChargeIdVariables = {
  financialStatus: ..., // optional
  fulfillmentStatus: ..., // optional
  receiptUrl: ..., // optional
  processedAt: ..., // optional
  chargeId: ..., // optional
};

// Call the `updateOrderByChargeIdRef()` function to get a reference to the mutation.
const ref = updateOrderByChargeIdRef(updateOrderByChargeIdVars);
// Variables can be defined inline as well.
const ref = updateOrderByChargeIdRef({ financialStatus: ..., fulfillmentStatus: ..., receiptUrl: ..., processedAt: ..., chargeId: ..., });
// Since all variables are optional for this mutation, you can omit the `UpdateOrderByChargeIdVariables` argument.
const ref = updateOrderByChargeIdRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateOrderByChargeIdRef(dataConnect, updateOrderByChargeIdVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.order_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.order_update);
});
```

## CreateOrderItem
You can execute the `CreateOrderItem` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
createOrderItem(vars: CreateOrderItemVariables): MutationPromise<CreateOrderItemData, CreateOrderItemVariables>;

interface CreateOrderItemRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateOrderItemVariables): MutationRef<CreateOrderItemData, CreateOrderItemVariables>;
}
export const createOrderItemRef: CreateOrderItemRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createOrderItem(dc: DataConnect, vars: CreateOrderItemVariables): MutationPromise<CreateOrderItemData, CreateOrderItemVariables>;

interface CreateOrderItemRef {
  ...
  (dc: DataConnect, vars: CreateOrderItemVariables): MutationRef<CreateOrderItemData, CreateOrderItemVariables>;
}
export const createOrderItemRef: CreateOrderItemRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createOrderItemRef:
```typescript
const name = createOrderItemRef.operationName;
console.log(name);
```

### Variables
The `CreateOrderItem` mutation requires an argument of type `CreateOrderItemVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateOrderItemVariables {
  orderId: UUIDString;
  productId: UUIDString;
  quantity: number;
  price: number;
}
```
### Return Type
Recall that executing the `CreateOrderItem` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateOrderItemData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateOrderItemData {
  orderItem_insert: OrderItem_Key;
}
```
### Using `CreateOrderItem`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createOrderItem, CreateOrderItemVariables } from '@firebasegen/default-connector';

// The `CreateOrderItem` mutation requires an argument of type `CreateOrderItemVariables`:
const createOrderItemVars: CreateOrderItemVariables = {
  orderId: ..., 
  productId: ..., 
  quantity: ..., 
  price: ..., 
};

// Call the `createOrderItem()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createOrderItem(createOrderItemVars);
// Variables can be defined inline as well.
const { data } = await createOrderItem({ orderId: ..., productId: ..., quantity: ..., price: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createOrderItem(dataConnect, createOrderItemVars);

console.log(data.orderItem_insert);

// Or, you can use the `Promise` API.
createOrderItem(createOrderItemVars).then((response) => {
  const data = response.data;
  console.log(data.orderItem_insert);
});
```

### Using `CreateOrderItem`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createOrderItemRef, CreateOrderItemVariables } from '@firebasegen/default-connector';

// The `CreateOrderItem` mutation requires an argument of type `CreateOrderItemVariables`:
const createOrderItemVars: CreateOrderItemVariables = {
  orderId: ..., 
  productId: ..., 
  quantity: ..., 
  price: ..., 
};

// Call the `createOrderItemRef()` function to get a reference to the mutation.
const ref = createOrderItemRef(createOrderItemVars);
// Variables can be defined inline as well.
const ref = createOrderItemRef({ orderId: ..., productId: ..., quantity: ..., price: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createOrderItemRef(dataConnect, createOrderItemVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.orderItem_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.orderItem_insert);
});
```

