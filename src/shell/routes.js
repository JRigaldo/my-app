export default [
  {
    route: ['', 'home'],
    name: 'home',
    moduleId: 'posts/index',
    nav: true,
    title: 'Home',
    settings: {
      iconClass: 'icon-home',
      iconCross: 'icon-cross'
    }
  },
  {
    route: 'post/:slug',
    name: 'post-view',
    moduleId: 'posts/view',
    title: 'View Post'
  },
  {
    route: 'post/:slug/edit',
    name: 'post-edit',
    moduleId: 'posts/edit',
    title: 'Edit Post',
  },
  {
    route: 'tag/:tag',
    name: 'tag-view',
    moduleId: 'posts/tag-view',
    title: 'View Post by Tag'
  },
  {
    route: 'archive/:archive',
    name: 'archive-view',
    moduleId: 'posts/archives-view',
    title: 'View Post by Archive'
  },
  {
    route: 'register',
    name: 'register',
    moduleId: 'auth/index',
    nav: true,
    title: 'Register',
    settings: {
      iconClass: 'icon-key',
      iconCross: 'icon-cross'
    }
  },
  {
    route: 'users',
    name: 'users',
    moduleId: 'users/users',
    nav: true,
    title: 'Users',
    auth: true,
    settings: {
      iconClass: 'icon-users',
      iconCross: 'icon-cross'
    }
  },
  {
    route: 'account',
    name: 'account',
    moduleId: 'users/account',
    nav: true,
    title: 'Account',
    auth: true,
    settings: {
      iconClass: 'icon-cool2',
      iconCross: 'icon-cross'
    }
  },
  {
    route: 'create-post',
    name: 'create-post',
    moduleId: 'posts/create',
    nav: true,
    title: 'Create Post',
    auth: true,
    settings: {
      iconClass: 'icon-cool2',
      iconCross: 'icon-cross'
    }
  }
];
