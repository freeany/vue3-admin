import {
  getAmountList,
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getGoodsAddressSale
} from '@/service/main/analysis/analysis'
import { defineStore } from 'pinia'

interface IAnalysisState {
  amountData: any[]
  goodsCategoryCount: any[]
  goodsCategorySale: any[]
  goodsCategoryFavor: any[]
  goodsAddressSale: any[]
}

const useAnalysisStore = defineStore('analysis', {
  state: (): IAnalysisState => ({
    amountData: [],
    goodsCategoryCount: [],
    goodsCategorySale: [],
    goodsCategoryFavor: [],
    goodsAddressSale: []
  }),
  actions: {
    fetchDashboardDataAction() {
      getAmountList().then((res) => {
        this.amountData = res
      })
      getCategoryGoodsCount().then((res) => {
        this.goodsCategoryCount = res
      })
      getCategoryGoodsSale().then((res) => {
        this.goodsCategorySale = res
      })
      getCategoryGoodsFavor().then((res) => {
        this.goodsCategoryFavor = res
      })
      getGoodsAddressSale().then((res) => {
        this.goodsAddressSale = res.data
      })
    }
  }
})

export default useAnalysisStore
