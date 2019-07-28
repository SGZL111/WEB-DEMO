export default {
  // state参数指的是所有的公用数据
  changeCityMutation (state, city) {
    state.city = city
    try {
      localStorage.city = city
    } catch (e) {}
  }
}
