let AccountController = require("../controller/account");
let { Interface, Route, Validate } = jike;
/**
 * 创建接口解析函数 将对应的接口解析到对应的controller的对应方法
 * 默认需要token
 */
Interface.create('/account', AccountController, [

  /**
   * 同步微信信息
   */
  Route('/weixin/syncinfo/:id', 'post','weixinSync',{
    validate: {
      rawData: [
        Validate.MUST_VALIDATE,
        ['require', 'paramsNotNullErr']
      ]
    }
  }),
  Route('/signIn/weixin', 'post', 'weixinSignin', {
    validate: {
      code: [
        Validate.MUST_VALIDATE,
        ['require', 'paramsNotNullErr']
      ],
      rawData: [
        Validate.MUST_VALIDATE,
        ['require', 'paramsNotNullErr']
      ],
      signature: [
        Validate.MUST_VALIDATE,
        ['require', 'paramsNotNullErr']
      ],
      encryptedData: [
        Validate.MUST_VALIDATE,
        ['require', 'paramsNotNullErr']
      ],
      iv: [
        Validate.MUST_VALIDATE,
        ['require', 'paramsNotNullErr']
      ]
    },
    needToken: false
  }),
  //user和管理员登录接口
  Route('/signIn', 'post', 'signin', {
    validate: {
      account: [
        Validate.MUST_VALIDATE,
        ['tel', 'telErr']
      ],
      password: [
        Validate.MUST_VALIDATE,
        ['require', 'passwordNullErr']
      ],
      type: [
        Validate.EXISTS_VALIDATE,
        [['user', 'admin'], 'signInTypeError', 'in']
      ]
    },
    needToken: false
  }),
  //修改信息
  Route("/:id(\\d+)", 'put', 'changeInfo', {
    validate: {
      nickname: [
        Validate.EXISTS_VALIDATE,
        ['require', 'nicknameNotNullErr']
      ],
      gender: [
        Validate.EXISTS_VALIDATE,
        [[0, 1], 'genderErr', 'in']
      ]
    },
    needToken: false
  }),
  //账户头像   user  admin头像一致
  Route("/avatar/:id(\\d+).png", 'get', 'avatar', {

    needToken: false
  }),
  /**
   * 设置头像
   */
  Route("/avatar/:id(\\d+)", 'put', 'changeAvatar', {
    validate: {
      avatar: [
        Validate.MUST_VALIDATE,
        ['require', 'avatarNotNullErr']
      ]
    },
    needToken: false
  }),
  /**
   * 修改手机号
   */
  Route("/tel", 'put', 'changeTel', {
    validate: {
      base: {
        tel: [
          Validate.MUST_VALIDATE,
          ['tel', 'telErr']
        ],
        newTel: [
          Validate.MUST_VALIDATE,
          ['tel', 'newTelErr']
        ],
      },
      user: {
        code: [
          Validate.MUST_VALIDATE,
          [6, 'codeLengthErr', 'length']
        ],
        newCode: [
          Validate.MUST_VALIDATE,
          [6, 'codeLengthErr', 'length']
        ]
      }
    },
    needToken: true
  }),
  //手机验证码改密码
  Route('/pwd/tel/:tel', 'put', 'changePwdByTel', {
    validate: {
      base: {
        tel: [
          Validate.MUST_VALIDATE,
          ['tel', 'telErr']
        ],
        password: [
          Validate.MUST_VALIDATE,
          ['require', 'passwordNullErr'],
          [[6, 18], 'passwordLengthErr', 'length']
        ],
      },
      user: {
        code: [
          Validate.MUST_VALIDATE,
          [6, 'codeLengthErr', 'length']
        ]
      }
    },
    needToken: false
  }),
  //旧密码换新密码
  Route('/pwd/:id(\\d+)', 'put', 'changePwd', {
    validate: {
      password: [
        Validate.MUST_VALIDATE,
        ['require', 'passwordNullErr']
      ],
      newPassword: [
        Validate.MUST_VALIDATE,
        ['require', 'newPasswordNullErr'],
        [[6, 18], 'newPasswordLengthErr', 'length']
      ]
    },
    needToken: false
  }),

])