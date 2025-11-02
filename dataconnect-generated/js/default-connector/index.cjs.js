const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'firebase-ecommerce',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

const upsertCustomerRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertCustomer', inputVars);
}
upsertCustomerRef.operationName = 'UpsertCustomer';
exports.upsertCustomerRef = upsertCustomerRef;

exports.upsertCustomer = function upsertCustomer(dcOrVars, vars) {
  return executeMutation(upsertCustomerRef(dcOrVars, vars));
};

const createProductReviewRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateProductReview', inputVars);
}
createProductReviewRef.operationName = 'CreateProductReview';
exports.createProductReviewRef = createProductReviewRef;

exports.createProductReview = function createProductReview(dcOrVars, vars) {
  return executeMutation(createProductReviewRef(dcOrVars, vars));
};

const createOrderRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateOrder', inputVars);
}
createOrderRef.operationName = 'CreateOrder';
exports.createOrderRef = createOrderRef;

exports.createOrder = function createOrder(dcOrVars, vars) {
  return executeMutation(createOrderRef(dcOrVars, vars));
};

const updateOrderByPaymentIntentIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateOrderByPaymentIntentId', inputVars);
}
updateOrderByPaymentIntentIdRef.operationName = 'UpdateOrderByPaymentIntentId';
exports.updateOrderByPaymentIntentIdRef = updateOrderByPaymentIntentIdRef;

exports.updateOrderByPaymentIntentId = function updateOrderByPaymentIntentId(dcOrVars, vars) {
  return executeMutation(updateOrderByPaymentIntentIdRef(dcOrVars, vars));
};

const updateOrderByChargeIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateOrderByChargeId', inputVars);
}
updateOrderByChargeIdRef.operationName = 'UpdateOrderByChargeId';
exports.updateOrderByChargeIdRef = updateOrderByChargeIdRef;

exports.updateOrderByChargeId = function updateOrderByChargeId(dcOrVars, vars) {
  return executeMutation(updateOrderByChargeIdRef(dcOrVars, vars));
};

const createOrderItemRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateOrderItem', inputVars);
}
createOrderItemRef.operationName = 'CreateOrderItem';
exports.createOrderItemRef = createOrderItemRef;

exports.createOrderItem = function createOrderItem(dcOrVars, vars) {
  return executeMutation(createOrderItemRef(dcOrVars, vars));
};

const listCustomersRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListCustomers');
}
listCustomersRef.operationName = 'ListCustomers';
exports.listCustomersRef = listCustomersRef;

exports.listCustomers = function listCustomers(dc) {
  return executeQuery(listCustomersRef(dc));
};

const getReviewsByHandleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetReviewsByHandle', inputVars);
}
getReviewsByHandleRef.operationName = 'GetReviewsByHandle';
exports.getReviewsByHandleRef = getReviewsByHandleRef;

exports.getReviewsByHandle = function getReviewsByHandle(dcOrVars, vars) {
  return executeQuery(getReviewsByHandleRef(dcOrVars, vars));
};

const getProductByHandleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetProductByHandle', inputVars);
}
getProductByHandleRef.operationName = 'GetProductByHandle';
exports.getProductByHandleRef = getProductByHandleRef;

exports.getProductByHandle = function getProductByHandle(dcOrVars, vars) {
  return executeQuery(getProductByHandleRef(dcOrVars, vars));
};

const getCollectionByHandleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCollectionByHandle', inputVars);
}
getCollectionByHandleRef.operationName = 'GetCollectionByHandle';
exports.getCollectionByHandleRef = getCollectionByHandleRef;

exports.getCollectionByHandle = function getCollectionByHandle(dcOrVars, vars) {
  return executeQuery(getCollectionByHandleRef(dcOrVars, vars));
};

const getCollectionsByPageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCollectionsByPage', inputVars);
}
getCollectionsByPageRef.operationName = 'GetCollectionsByPage';
exports.getCollectionsByPageRef = getCollectionsByPageRef;

exports.getCollectionsByPage = function getCollectionsByPage(dcOrVars, vars) {
  return executeQuery(getCollectionsByPageRef(dcOrVars, vars));
};

const searchProductDescriptionUsingL2similarityRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'SearchProductDescriptionUsingL2Similarity', inputVars);
}
searchProductDescriptionUsingL2similarityRef.operationName = 'SearchProductDescriptionUsingL2Similarity';
exports.searchProductDescriptionUsingL2similarityRef = searchProductDescriptionUsingL2similarityRef;

exports.searchProductDescriptionUsingL2similarity = function searchProductDescriptionUsingL2similarity(dcOrVars, vars) {
  return executeQuery(searchProductDescriptionUsingL2similarityRef(dcOrVars, vars));
};

const searchProductTitleUsingL2similarityRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'SearchProductTitleUsingL2Similarity', inputVars);
}
searchProductTitleUsingL2similarityRef.operationName = 'SearchProductTitleUsingL2Similarity';
exports.searchProductTitleUsingL2similarityRef = searchProductTitleUsingL2similarityRef;

exports.searchProductTitleUsingL2similarity = function searchProductTitleUsingL2similarity(dcOrVars, vars) {
  return executeQuery(searchProductTitleUsingL2similarityRef(dcOrVars, vars));
};

const searchProductReviewContentUsingL2similarityRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'SearchProductReviewContentUsingL2Similarity', inputVars);
}
searchProductReviewContentUsingL2similarityRef.operationName = 'SearchProductReviewContentUsingL2Similarity';
exports.searchProductReviewContentUsingL2similarityRef = searchProductReviewContentUsingL2similarityRef;

exports.searchProductReviewContentUsingL2similarity = function searchProductReviewContentUsingL2similarity(dcOrVars, vars) {
  return executeQuery(searchProductReviewContentUsingL2similarityRef(dcOrVars, vars));
};

const getOrdersByCustomerIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetOrdersByCustomerId', inputVars);
}
getOrdersByCustomerIdRef.operationName = 'GetOrdersByCustomerId';
exports.getOrdersByCustomerIdRef = getOrdersByCustomerIdRef;

exports.getOrdersByCustomerId = function getOrdersByCustomerId(dcOrVars, vars) {
  return executeQuery(getOrdersByCustomerIdRef(dcOrVars, vars));
};

const getOrderByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetOrderById', inputVars);
}
getOrderByIdRef.operationName = 'GetOrderById';
exports.getOrderByIdRef = getOrderByIdRef;

exports.getOrderById = function getOrderById(dcOrVars, vars) {
  return executeQuery(getOrderByIdRef(dcOrVars, vars));
};
