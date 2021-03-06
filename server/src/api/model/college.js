//模型
module.exports = class College extends JikeJs.Model {

    constructor(props) {
        super(props);
        this.table("colleges");
    }
    async info(id) {
        return await this.where({ college_id: id }).find();
    }
    /**
     * 获取学校列表
     */
    async list({ search, pageable, page, pageSize, del, use, ids }) {

        let total;
        let _where = [];
        if (!this.isUndefined(search)) {
            _where.push({
                college_name: ['like', `%${search}%`]
            }, "AND")
        }
        if (!this.isUndefined(use)) {
            _where.push({
                is_use: use
            }, "AND")
        }
        if (!this.isUndefined(ids)) {
            _where.push({
                college_id: ['in', ids]
            }, "AND")
        }
        _where.push({
            is_del: del
        })
        total = await this.where(_where).count();
        let list = await this.field('college_id as cid,college_name as cname,_c as c_c,liveness,now_live as now_live,is_use,is_del').page(page - 1, pageSize).where(_where).select();
        return {
            list,
            pagination: {
                total, pageSize
            }
        }
    }
    /**
     * 修改学校基本信息
     */
    async updateInfo(id, data) {
        //获取id 的基本信息
        let info = await this.info(id);
        if (!info) {
            throw new Error("学校不存在");
        }
        //过滤字段
        data = this.filter_handle(data, ['college_name']);

        let { affectedRows = 0 } = await this.data(data).where({ college_id: id }).update();
        return affectedRows > 0;
    }
    async add({ name }) {
        if (await this.where({ college_name: name }).find()) {
            this.fail(this.codes.COLLEGE_NAME_USED);
        }
        let { insertId = false } = await this.data({ college_name: name }).insert() || {};
        return insertId;
    }
    /**
     * 删除学校
     */
    async del(ids, is_del) {

        let { affectedRows = 0 } = await this.where({
            college_id: ['in', ids]
        }).data({
            is_del
        }).update();
        return affectedRows > 0;
    }
    /**
     * 禁用学校
     */
    async use(ids, is_use) {

        console.log(is_use)
        let { affectedRows = 0 } = await this.where({
            college_id: ['in', ids]
        }).data({
            is_use
        }).update();
        return affectedRows > 0;
    }
}