export const adminMenu = [
// ================  khai báo heder Admin =============

    { //===== Quản lý Người dùng =====

        name: 'menu.admin.admin-user', menus: [
            { name: 'menu.admin.home-Admin', link: '/system/user-admin' },
            { name: 'menu.admin.manage-user', link: '/system/manage-user' },  
        ]
    },

    { // ==== Quản lý Danh mục =====

        name: 'menu.admin.menu', menus: [
            { name: 'menu.admin.manage-menu', link: '/system/manage-menu' },
            { name: 'menu.admin.manage-types', link: '/system/manage-types' },
        ]
    },

    { // ====== Quản lý sản phẩm =====

        name: 'menu.admin.product', menus: [
            { name: 'menu.admin.manage-product', link: '/system/manage-product'},
            { name: 'menu.admin.manage-product-list', link: '/system/shows-the-product-list'},
            { name: 'menu.admin.manage-product-description', link: '/system/product-description'},
        ]
    },

    { // ====== Quản lý giỏi hàng =====

        name: 'menu.admin.Slider', menus: [
            {
                name: 'menu.admin.manage-Slider', link: '/system/manage-Slider'
            },
        ]
    },
];