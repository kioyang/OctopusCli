const MenuConfig = [{
  path: '/',
  redirect: '/stockin/stockInAppointment'
},
  {
  path: '/login',
  component: './Login',
}, {
  path: '/workstation',
  component: './WorkStation',
}, 
{
  path: '/home',
  component: '../layouts/HomeLayout',
  routes: [
    {
      name: 'stockin',
      icon: 'schedule',
      path: '/home',
      component: '../layouts/homes/Home',
  },
      {
        name: 'stockin',
        icon: 'schedule',
        path: '/home/about',
        component: '../layouts/homes/About',
    },
    {
      name: 'stockin',
      icon: 'schedule',
      path: '/home/overview',
      component: '../layouts/homes/Overview',
  },
  {
    name: 'stockin',
    icon: 'schedule',
    path: '/home/news',
    component: '../layouts/homes/News',
},
{
  name: 'stockin',
  icon: 'schedule',
  path: '/home/contactus',
  component: '../layouts/homes/ContactUs',
},
{
  name: 'stockin',
  icon: 'schedule',
  path: '/home/about',
  component: '../layouts/homes/About',
}
  ]
},
{
  path: '/',
  component: '../layouts/BasicLayout',
  authority: ['admin', 'user'],
  routes: [
    {
      name: 'stockin',
      icon: 'schedule',
      path: '/stockin',
      routes: [
        {
          path: '/stockin/stockInAppointment',
          name: 'stockInAppointment',
          icon: 'schedule',
          component: './StockInAppointment',
        },
        {
          path: '/stockin/stockInAppointment/:id',
          name: 'stockInAppointmentEdit',
          icon: 'smile',
          hideInMenu: true,
          component: './StockInAppointmentEdit',
        },
        {
          path: '/stockin/stockInAppointment/:mode/:id',
          name: 'stockInAppointmentDetail',
          icon: 'schedule',
          hideInMenu: true,
          component: './StockInAppointmentDetail',
        },
        {
          path: '/stockin/Inbound',
          name: 'Inbound',
          icon: 'schedule',
          component: './Inbound',
        },
        {
          path: '/stockin/Inbound/:mode/:id',
          name: 'InboundDetail',
          icon: 'schedule',
          hideInMenu: true,
          component: './InboundDetail',
        },
      ]
    },
    {
      name: 'stockout',
      icon: 'schedule',
      path: '/stockout',
      routes: [
        {
          name: 'OutboundAppointment',
          key: 'OutboundAppointment',
          icon: 'schedule',
          path: '/stockout/OutboundAppointment',
          component: './OutboundAppointment',
        }, {
          path: '/stockout/OutboundAppointment/:mode/:id',
          name: 'OutboundAppointmentDetail',
          icon: 'smile',
          hideInMenu: true,
          component: './OutboundAppointmentDetail',
        },
        {
          path: '/stockout/OutboundAppointment/:id',
          name: 'OutboundAppointmentEdit',
          icon: 'smile',
          hideInMenu: true,
          component: './OutboundAppointmentEdit',
        },
        {
          path: '/stockout/Outbound',
          name: 'Outbound',
          component: './Outbound',
        },
        {
          path: '/stockout/Outbound/:mode/:id',
          name: 'OutboundDetail',
          hideInMenu: true,
          component: './OutboundDetail',
        },
      ]
    },
    // 库存管理
    {
      name: 'stock',
      icon: 'schedule',
      path: '/stock',
      routes: [
        {
          name: 'GoodsStock',
          key: 'GoodsStock',
          icon: 'schedule',
          path: '/stock/GoodsStock',
          component: './GoodsStock',
        }, {
          path: '/stock/GoodsStockDetail/:mode/:id',
          name: 'GoodsStockDetail',
          icon: 'smile',
          hideInMenu: true,
          component: './GoodsStockDetail',
        },
        {
          name: 'BatchStock',
          key: 'BatchStock',
          icon: 'schedule',
          path: '/stock/BatchStock',
          component: './BatchStock',
        }, {
          path: '/stock/BatchStockDetail/:mode/:id',
          name: 'BatchStockDetail',
          icon: 'smile',
          hideInMenu: true,
          component: './BatchStockDetail',
        },
      ]
    },
    // 报表管理
    {
      name: 'report',
      icon: 'schedule',
      path: '/report',
      routes: [
        {
          path: '/report/ThroughPutDetail',
          name: 'ThroughPutDetail',
          icon: 'smile',
          component: './ThroughPutDetail',
        },
      ]
    },
    {
      component: './404',
    },
  ],
}, {
  component: './404',
}]

export default MenuConfig;