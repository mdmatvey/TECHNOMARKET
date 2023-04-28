import { makeAutoObservable } from 'mobx'

export default class ProductStore {
  constructor () {
    this._categories = []
    this._brands = []
    this._products = []
    this._isProductsLoading = true
    this._searchQuery = ''
    this._selectedCategory = []
    this._selectedCategoryIndex = []
    this._selectedBrands = []
    this._displayGrid = true
    this._page = 1
    this._totalCount = 0
    this._limit = 12
    makeAutoObservable(this)
  }

  setCategories (categories) {
    this._categories = categories
  }

  setBrands (brands) {
    this._brands = brands
  }

  setProducts (product) {
    this._products = product
  }

  setIsProductsLoading (bool) {
    this._isProductsLoading = bool
  }

  setSearchQuery (query) {
    this.setSelectedCategory([])
    this.setSelectedBrands([])
    this._searchQuery = query
  }

  setSelectedCategory (category) {
    this.setPage(1)
    this._selectedCategory = category
  }

  setSelectedCategoryIndex (index) {
    this._selectedCategoryIndex = index
  }

  setSelectedBrands (brands) {
    this.setPage(1)
    this._selectedBrands = brands
  }

  setLimit (limit) {
    this._limit = limit
  }

  setDisplayGrid (bool) {
    this._displayGrid = bool
  }

  setPage (page) {
    this._page = page
  }

  setTotalCount (count) {
    this._totalCount = count
  }

  get categories () {
    return this._categories
  }

  get brands () {
    return this._brands
  }

  get products () {
    return this._products
  }

  get isProductsLoading () {
    return this._isProductsLoading
  }

  get searchQuery () {
    return this._searchQuery
  }

  get selectedCategory () {
    return this._selectedCategory
  }

  get selectedCategoryIndex () {
    return this._selectedCategoryIndex
  }

  get selectedBrands () {
    return this._selectedBrands
  }

  get totalCount () {
    return this._totalCount
  }

  get displayGrid () {
    return this._displayGrid
  }

  get page () {
    return this._page
  }

  get limit () {
    return this._limit
  }
}
