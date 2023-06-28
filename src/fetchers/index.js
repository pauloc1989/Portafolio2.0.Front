import { http } from "./http";

const getInformation = async () => {
  let res = await http.get(`/api/information.json`);
  return res.data;
};

const getServices = async () => {
  let res = await http.get(`/api/services.json`);
  return res.data;
};

const getCategories = async () => {
  let res = await http.get(`/api/categories.json`);
  return res.data;
};

const getPortfolioFilters = async () => {
  let res = await http.get(`/api/portfoliofilters.json`);
  return res.data;
};

const getPortfolios = async () => {
  let res = await http.get(`/api/portfolios.json`);
  return res.data;
};

const getEducationBackground = async () => {
  let res = await http.get(`/api/educationbackground.json`);
  return res.data;
};

const getClientReviews = async () => {
  let res = await http.get(`/api/clientsreview.json`);
  return res.data;
};

export {
  getInformation,
  getServices,
  getCategories,
  getPortfolioFilters,
  getPortfolios,
  getEducationBackground,
  getClientReviews,
};
