import {combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router';
import adminReducer from './adminReducer'
import appReducer from "./appReducer";
import userReducer from "./userReducer";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

// lưu thông tin login
const userPersistConfig = {
    ...persistCommonConfig,
    key: 'user',
    whitelist: ['isLoggedIn', 'userInfo']
};
//  ==== lưu khi đổi ngôn ngữ Admin và home đồng bộ dữ liệu =========
const appPersistConfig = {
    ...persistCommonConfig,
    key: 'app',
    whitelist: ['language']

}

export default (history) => combineReducers({
    router: connectRouter(history),
    user: persistReducer(userPersistConfig, userReducer),
    app: persistReducer (appPersistConfig,appReducer),
    admin: adminReducer
})