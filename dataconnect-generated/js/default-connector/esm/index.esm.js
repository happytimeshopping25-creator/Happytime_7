import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'default',
  service: 'firebase-ecommerce',
  location: 'us-central1'
};

export const upsertCustomerRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertCustomer', inputVars);
}
upsertCustomerRef.operationName = 'UpsertCustomer';

export function upsertCustomer(dcOrVars, vars) {
  return executeMutation(upsertCustomerRef(dcOrVars, vars));
}

export const createProductReviewRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateProductReview', inputVars);
}
createProductReviewRef.operationName = 'CreateProductReview';

export function createProductReview(dcOrVars, vars) {
  return executeMutation(createProductReviewRef(dcOrVars, vars));
}

export const createOrderRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateOrder', inputVars);
}
createOrderRef.operationName = 'CreateOrder';

export function createOrder(dcOrVars, vars) {
  return executeMutation(createOrderRef(dcOrVars, vars));
}

export const updateOrderByPaymentIntentIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateOrderByPaymentIntentId', inputVars);
}
updateOrderByPaymentIntentIdRef.operationName = 'UpdateOrderByPaymentIntentId';

export function updateOrderByPaymentIntentId(dcOrVars, vars) {
  return executeMutation(updateOrderByPaymentIntentIdRef(dcOrVars, vars));
}

export const updateOrderByChargeIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateOrderByChargeId', inputVars);
}
updateOrderByChargeIdRef.operationName = 'UpdateOrderByChargeId';

export function updateOrderByChargeId(dcOrVars, vars) {
  return executeMutation(updateOrderByChargeIdRef(dcOrVars, vars));
}

export const createOrderItemRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateOrderItem', inputVars);
}
createOrderItemRef.operationName = 'CreateOrderItem';

export function createOrderItem(dcOrVars, vars) {
  return executeMutation(createOrderItemRef(dcOrVars, vars));
}

export const listCustomersRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListCustomers');
}
listCustomersRef.operationName = 'ListCustomers';

export function listCustomers(dc) {
  return executeQuery(listCustomersRef(dc));
}

export const getReviewsByHandleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetReviewsByHandle', inputVars);
}
getReviewsByHandleRef.operationName = 'GetReviewsByHandle';

export function getReviewsByHandle(dcOrVars, vars) {
  return executeQuery(getReviewsByHandleRef(dcOrVars, vars));
}

export const getProductByHandleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetProductByHandle', inputVars);
}
getProductByHandleRef.operationName = 'GetProductByHandle';

export function getProductByHandle(dcOrVars, vars) {
  return executeQuery(getProductByHandleRef(dcOrVars, vars));
}

export const getCollectionByHandleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCollectionByHandle', inputVars);
}
getCollectionByHandleRef.operationName = 'GetCollectionByHandle';

export function getCollectionByHandle(dcOrVars, vars) {
  return executeQuery(getCollectionByHandleRef(dcOrVars, vars));
}

export const getCollectionsByPageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCollectionsByPage', inputVars);
}
getCollectionsByPageRef.operationName = 'GetCollectionsByPage';

export function getCollectionsByPage(dcOrVars, vars) {
  return executeQuery(getCollectionsByPageRef(dcOrVars, vars));
}

export const searchProductDescriptionUsingL2similarityRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'SearchProductDescriptionUsingL2Similarity', inputVars);
}
searchProductDescriptionUsingL2similarityRef.operationName = 'SearchProductDescriptionUsingL2Similarity';

export function searchProductDescriptionUsingL2similarity(dcOrVars, vars) {
  return executeQuery(searchProductDescriptionUsingL2similarityRef(dcOrVars, vars));
}

export const searchProductTitleUsingL2similarityRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'SearchProductTitleUsingL2Similarity', inputVars);
}
searchProductTitleUsingL2similarityRef.operationName = 'SearchProductTitleUsingL2Similarity';

export function searchProductTitleUsingL2similarity(dcOrVars, vars) {
  return executeQuery(searchProductTitleUsingL2similarityRef(dcOrVars, vars));
}

export const searchProductReviewContentUsingL2similarityRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'SearchProductReviewContentUsingL2Similarity', inputVars);
}
searchProductReviewContentUsingL2similarityRef.operationName = 'SearchProductReviewContentUsingL2Similarity';

export function searchProductReviewContentUsingL2similarity(dcOrVars, vars) {
  return executeQuery(searchProductReviewContentUsingL2similarityRef(dcOrVars, vars));
}

export const getOrdersByCustomerIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetOrdersByCustomerId', inputVars);
}
getOrdersByCustomerIdRef.operationName = 'GetOrdersByCustomerId';

export function getOrdersByCustomerId(dcOrVars, vars) {
  return executeQuery(getOrdersByCustomerIdRef(dcOrVars, vars));
}

export const getOrderByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetOrderById', inputVars);
}
getOrderByIdRef.operationName = 'GetOrderById';

export function getOrderById(dcOrVars, vars) {
  return executeQuery(getOrderByIdRef(dcOrVars, vars));
}

