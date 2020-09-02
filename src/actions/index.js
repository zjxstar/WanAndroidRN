import { getHomeBannerAction } from './actionCreator';
import { getHomeBanner } from '../api';
import store from '../store';

/**
 * 拉取首页Banner图
 */
export function fetchHomeBanner() {
    getHomeBanner()
        .then(res => store.dispatch(getHomeBannerAction(res.data)))
        .catch(err => {
            console.log('fetch home banner error', err)
        })
}