import { makeAutoObservable } from 'mobx'

export default class ProductStore {
  constructor () {
    this._categories = []
    this._categoriesToDisplay = []
    this._brands = []
    this._products = []
    this._currentProducts = []
    this._selectedCategory = {}
    this._selectedBrand = {}
    this._displayGrid = true
    this._page = 1
    this._totalCount = 0
    this._limit = 8
    makeAutoObservable(this)
  }

  setCategories (categories) {
    this._categories = categories
  }

  setCategoriesToDisplay (categories) {
    this._categoriesToDisplay = categories
  }

  setBrands (brands) {
    this._brands = brands
  }

  setProducts (product) {
    this._products = product
  }

  setCurrentProducts (products) {
    this._currentProducts = products
  }

  setSelectedCategory (category) {
    this.setPage(1)
    this._selectedCategory = category
  }

  setSelectedBrand (brand) {
    this.setPage(1)
    this._selectedBrand = brand
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

  get categoriesToDisplay () {
    return this._categoriesToDisplay
  }

  get brands () {
    return this._brands
  }

  get products () {
    return this._products
  }

  get currentProducts () {
    return this._currentProducts
  }

  get selectedCategory () {
    return this._selectedCategory
  }

  get selectedBrand () {
    return this._selectedBrand
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
