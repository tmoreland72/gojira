const TASKS = {
  name: "tasks",
  title: "Tasks",
  singular: "Task"
}

const BUGS = {
  name: "bugs",
  title: "Bugs",
  singular: "Bug"
}

const IDEAS = {
  name: "ideas",
  title: "Ideas",
  singular: "Idea"
}

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'home', path: '', component: () => import('pages/Index.vue') },
      {
        name: 'projects',
        path: 'projects',
        component: () => import('pages/Projects.vue'),
      },
      {
        name: 'projects-add',
        path: 'projects/add',
        component: () => import('components/Projects/AddItem.vue'),
      },
      {
        name: 'projects-update',
        path: 'projects/update/:id',
        component: () => import('components/Projects/UpdateItem.vue'),
      },
      {
        name: 'tasks',
        path: 'tasks',
        props: {
          mode: 'list',
          module: TASKS,
        },
        component: () => import('pages/Tasks.vue')
      },
      {
        name: 'tasks-add',
        path: 'tasks/add',
        props: {
          mode: 'add',
          module: TASKS,
        },
        component: () => import('components/Shared/BasicForm.vue'),
      },
      {
        name: 'tasks-update',
        path: 'tasks/update/:id',
        props: {
          mode: 'update',
          module: TASKS,
        },
        component: () => import('components/Shared/BasicForm.vue'),
      },
      {
        name: 'bugs',
        path: 'bugs',
        props: {
          mode: 'list',
          module: BUGS,
        },
        component: () => import('pages/Bugs.vue')
      },
      {
        name: 'bugs-add',
        path: 'bugs/add',
        props: {
          mode: 'add',
          module: BUGS,
        },
        component: () => import('components/Shared/BasicForm.vue'),
      },
      {
        name: 'bugs-update',
        path: 'bugs/update/:id',
        props: {
          mode: 'update',
          module: BUGS,
        },
        component: () => import('components/Shared/BasicForm.vue'),
      },
      {
        name: 'ideas',
        path: 'ideas',
        props: {
          mode: 'list',
          module: IDEAS,
        },
        component: () => import('pages/Ideas.vue')
      },
      {
        name: 'ideas-add',
        path: 'ideas/add',
        props: {
          mode: 'add',
          module: IDEAS,
        },
        component: () => import('components/Shared/BasicForm.vue'),
      },
      {
        name: 'ideas-update',
        path: 'ideas/update/:id',
        props: {
          mode: 'update',
          module: IDEAS,
        },
        component: () => import('components/Shared/BasicForm.vue'),
      },
      { name: 'releases', path: 'releases', component: () => import('pages/Releases.vue') },
      { name: 'roadmap', path: 'roadmap', component: () => import('pages/Roadmap.vue') },
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
