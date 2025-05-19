
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/register"
  },
  {
    "renderMode": 2,
    "route": "/login"
  },
  {
    "renderMode": 2,
    "route": "/dashboard"
  },
  {
    "renderMode": 2,
    "route": "/main"
  },
  {
    "renderMode": 2,
    "route": "/deposit"
  },
  {
    "renderMode": 2,
    "route": "/withdraw"
  },
  {
    "renderMode": 2,
    "route": "/adminpanels"
  },
  {
    "renderMode": 2,
    "route": "/chat"
  },
  {
    "renderMode": 2,
    "route": "/adminchat"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 4007, hash: '5d6795e7de4996d76ca3942352c6d1aa91feb6cc1c4787b56eed689c2a8fe5e7', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 4304, hash: '29faf84f81a1f83619c1c500507d473a51d46afdac211d595d43ac50e017c167', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'register/index.html': {size: 8559, hash: '439129e05c9f53122544184b2d766f61fe1e1872fb0c4f29f54f0508f3962453', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 7430, hash: '410e835b6f2a558b4b0a9863a8a48fc3919653c57f999c4029a46717690c6f36', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'main/index.html': {size: 37679, hash: 'eef762f174d4965121e15d3586091648c8cc2f2a477772e04a696ba23616f9df', text: () => import('./assets-chunks/main_index_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 11644, hash: 'fde35ae37738edca10eaa67523d5a3f39fffe7e20b9c4eeccec13f6e2e5bd63f', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'deposit/index.html': {size: 9069, hash: 'df294f9471573de6df22e527ae7a312d63e8b972586ece4c0842f183afe75b6c', text: () => import('./assets-chunks/deposit_index_html.mjs').then(m => m.default)},
    'withdraw/index.html': {size: 10677, hash: '083856e85db5b1874d77f26aa0960bdbbd927c55d18ff83f2dc2ef412fad360d', text: () => import('./assets-chunks/withdraw_index_html.mjs').then(m => m.default)},
    'adminpanels/index.html': {size: 6040, hash: '36a85825a6c74e2cdfdb4df88d069e8ca0107f75e64d76c949f18c110a21e588', text: () => import('./assets-chunks/adminpanels_index_html.mjs').then(m => m.default)},
    'adminchat/index.html': {size: 6555, hash: '5693d61665da408103dfce83ffdb57ead84ec8084187603c7a9e76de5954c84a', text: () => import('./assets-chunks/adminchat_index_html.mjs').then(m => m.default)},
    'chat/index.html': {size: 9490, hash: 'd145c61573c53b1ffd594369e81f5378fe7abdb235e16baee6ea9baf3a365d4a', text: () => import('./assets-chunks/chat_index_html.mjs').then(m => m.default)},
    'index.html': {size: 37679, hash: 'eef762f174d4965121e15d3586091648c8cc2f2a477772e04a696ba23616f9df', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-VLW4NRR4.css': {size: 91, hash: 'ytzNTraupvQ', text: () => import('./assets-chunks/styles-VLW4NRR4_css.mjs').then(m => m.default)}
  },
};
