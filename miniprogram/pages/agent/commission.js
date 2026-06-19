const { request } = require('../../utils/request');

Page({
  data: {
    summary: {
      pending: '0.00',
      settled: '0.00'
    },
    records: [],
    loading: false
  },

  onShow() {
    this.loadCommissions();
  },

  async loadCommissions() {
    this.setData({ loading: true });
    try {
      const result = await request({ url: '/agent/commissions' });
      this.setData({
        summary: {
          pending: Number(result.summary.pending || 0).toFixed(2),
          settled: Number(result.summary.settled || 0).toFixed(2)
        },
        records: (result.records || []).map(item => ({
          ...item,
          amount: Number(item.amount || 0).toFixed(2)
        }))
      });
    } catch (error) {
      console.error('load commissions failed:', error);
    } finally {
      this.setData({ loading: false });
    }
  }
});
