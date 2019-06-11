import user from './user';
import menu from './menu';
import admin from './admin';

import website from '@/const/website'

/**
 * 模拟数据mock
 *
 * mock是否开启模拟数据拦截
 */


user({ mock: website.useMock });

menu({ mock:website.useMock });

admin({ mock: website.useMock });


