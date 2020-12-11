//引入define.js文件
document.write("<script type='text/javascript' src='define.js'></script>");
//引入json配置文件
document.write("<script type='text/javascript' src='config.json'></script>");
//控制数据管理
var ControlDataManage = {
    constructor() {
        //配置文件
        this.configFile = "config.json";
        //文件配置数据(存储文件的JSON串配置)
        this.fileConfigJsonData = "";
        //匹配规则
        this.matchingRule = [];
        //趋势配置
        this.trendTypeConfig = [];
        //默认配置
        this.defaultConfig = {};
        //最小局数
        this.defaultConfig.minDrawCount = 10;
        //最大局数
        this.defaultConfig.maxDrawCount = 1000;
        //局类型配置
        this.defaultConfig.drawTypeRatio = [];
        //控制配置
        this.ControlConfig = [];
        //初始化结果
        this.initDataRet = {};
        //设置code(默认失败)
        this.initDataRet.code = Define.Code.FAIL;
        return ControlDataManage;
    },

    /**
     * 初始化数据
     */
    initData() {
        //读取配置
        this.initDataRet = this.readConfig();
        return this.initDataRet;
        console.log("initData");
    },

    /**
     * 获取重置的返回数据
     */
    getResetReturnData() {
        var ret = {};
        //返回值(200 成功 0 失败)
        ret.code = 0;
        //异常原因
        ret.error = '';
        return ret;
    },

    /**
     * 生成随机数
     * @param {*} min   最小值 
     * @param {*} max   最大值
     */
    RandInt(min, max) {
        return (Math.floor(Math.random() * (max - min) + min));
    },

    /**
     * 混乱数组数据
     * @param {*} data 需要混乱的数据
     */
    RandArrayData(data) {
        if (data.length <= 0) {
            return null;
        }
        //混乱准备
        var cbCardData = [].concat(data);
        var cbCardBuffer = [];
        var length = data.length;

        //混乱数据
        var cbRandCount = 0;
        var cbPosition = 0;
        do {
            var randvalue = (((length - cbRandCount) - 1) + 1);
            cbPosition = Math.floor(Math.random() * randvalue);
            cbCardBuffer.push(cbCardData[cbPosition]);
            cbRandCount++;
            cbCardData[cbPosition] = cbCardData[length - cbRandCount];
        } while (cbRandCount < length);
        return cbCardBuffer;
    },

    /**
     * 读取配置
     */
    readConfig() {
        //返回值
        var ret = this.getResetReturnData();
        try {
            //文件配置数据
            this.fileConfigJsonData = data;
            //匹配规则
            {
                var matchingRule_Json = this.fileConfigJsonData.matchingRule;
                if (matchingRule_Json == null || matchingRule_Json.length == 0) {
                    //设置异常描述
                    ret.error = "config matchingRule 配置为空,配置读取失败!";
                    return ret;
                }
                //循环读取
                for (var i = 0; i < matchingRule_Json.length; i++) {
                    //下标数据
                    var items = matchingRule_Json[i];
                    if (items == null) {
                        continue;
                    }
                    //定义对象
                    var addData = {};
                    //类型
                    addData.type = items.type;
                    //描述
                    addData.desc = items.desc;
                    //添加数据
                    this.matchingRule.push(addData);
                }
            }

            //趋势类型配置
            {
                var trendType_Json = this.fileConfigJsonData.trendTypeConfig;
                if (trendType_Json == null || trendType_Json.length == 0) {
                    //设置异常描述
                    ret.error = "config trendTypeConfig 配置为空,配置读取失败!";
                    return ret;
                }
                //循环读取
                for (var i = 0; i < trendType_Json.length; i++) {
                    //下标数据
                    var items = trendType_Json[i];
                    if (items == null) {
                        continue;
                    }
                    //定义对象
                    var addData = {};
                    //类型
                    addData.type = items.type;
                    //抽取的倍数
                    addData.siphonMutiple = items.siphonMutiple;
                    //抽取的偏移
                    addData.siphonOffsetValue = items.siphonOffsetValue;
                    //描述
                    addData.desc = items.desc;
                    //添加数据
                    this.trendTypeConfig.push(addData);
                }
            }

            //默认配置
            {
                var defaultConfig_Json = this.fileConfigJsonData.defaultConfig;
                if (defaultConfig_Json == null) {
                    //设置异常描述
                    ret.error = "config defaultConfig 配置为空,配置读取失败!";
                    return ret;
                }

                //局数限制
                {
                    //最小局数
                    this.defaultConfig.minDrawCount = defaultConfig_Json.minDrawCount;
                    //最大局数
                    this.defaultConfig.maxDrawCount = defaultConfig_Json.maxDrawCount;
                }

                //局类型占比配置
                {
                    var drawTypeRatio_Json = defaultConfig_Json.drawTypeRatio;
                    if (drawTypeRatio_Json == null || drawTypeRatio_Json.length == 0) {
                        //设置异常描述
                        ret.error = "config defaultConfig drawTypeRatio 配置为空,配置读取失败!";
                        return ret;
                    }
                    //循环读取
                    for (var i = 0; i < drawTypeRatio_Json.length; i++) {
                        //下标数据
                        var items = drawTypeRatio_Json[i];
                        if (items == null) {
                            continue;
                        }
                        //定义对象
                        var addData = {};
                        //类型
                        addData.type = items.type;
                        //描述
                        addData.desc = items.desc;
                        //胜局占比
                        addData.winRatio = items.winRatio;
                        //输局占比
                        addData.lossRatio = items.lossRatio;
                        //添加数据
                        this.defaultConfig.drawTypeRatio.push(addData);
                    }
                }
            }

            //控制配置
            {
                var control_Json = this.fileConfigJsonData.ControlConfig;
                if (control_Json == null || control_Json.length == 0) {
                    //设置异常描述
                    ret.error = "config ControlConfig 配置为空,配置读取失败!";
                    return ret;
                }
                //循环读取
                for (var i = 0; i < control_Json.length; i++) {
                    //下标数据
                    var one_Itmes = control_Json[i];
                    if (one_Itmes == null) {
                        continue;
                    }
                    //定义对象
                    var one_AddData = {};
                    //数据集
                    one_AddData.data = [];
                    //服务名称
                    one_AddData.servername = one_Itmes.servername;
                    //服务类型
                    one_AddData.servertype = one_Itmes.servertype;
                    //提示
                    one_AddData.tip = one_Itmes.tip;
                    for (var j = 0; j < one_Itmes.data.length; j++) {
                        //下标数据
                        var two_Items = one_Itmes.data[j];
                        //定义对象
                        var two_AddData = {};
                        //房间等级
                        two_AddData.roomLv = two_Items.roomLv;
                        //服务类型
                        two_AddData.scoreType = two_Items.scoreType;
                        //控制倍数
                        two_AddData.controlMutiple = two_Items.controlMutiple;
                        //最小倍数
                        two_AddData.minMultiplier = two_Items.minMultiplier;
                        //最大倍数
                        two_AddData.maxMultiplier = two_Items.maxMultiplier;
                        //添加数据
                        one_AddData.data.push(two_AddData);
                    }
                    //添加数据
                    this.ControlConfig.push(one_AddData);
                }
            }

            //设置返回值
            ret.code = Define.Code.SUCCESS;
            //设置异常描述
            ret.error = "";
            return ret;
        } catch (error) {
            //设置异常描述
            ret.error = JSON.stringify(error.message);
        }
        return ret;
    },

    /**
     * 获取游戏信息
     * @param {*} serverType 服务类型
     * @param {*} roomLv     房间等级
     * @param {*} scoreType  分数类型
     */
    getGameInfo(serverType, roomLv, scoreType) {
        //循环查找
        for (var i = 0; i < this.ControlConfig.length; i++) {
            //下标数据
            var one_Items = this.ControlConfig[i];
            if (!one_Items) {
                continue;
            }
            //服务类型判断
            if (one_Items.servertype == serverType) {
                //循环查找
                for (var j = 0; j < one_Items.data.length; j++) {
                    //下标数据
                    var two_Items = one_Items.data[j];
                    if (two_Items.roomLv == roomLv && two_Items.scoreType == scoreType) {
                        return two_Items;
                    }
                }
            }
        }
        return null;
    },

    /**
     * 获取匹配规则
     * @param {*} Ruletype 
     */
    getMatchingRule(Ruletype) {
        for (var i = 0; i < this.matchingRule.length; i++) {
            //下标数据
            var items = this.matchingRule[i];
            if (!items) {
                continue;
            }
            if (items.type == Ruletype) {
                return items;
            }
        }
    },

    /**
     * 获取趋势类型信息
     * @param {*} trendType 趋势类型
     */
    getTrendTypeInfo(trendType) {
        for (var i = 0; i < this.trendTypeConfig.length; i++) {
            //下标数据
            var items = this.trendTypeConfig[i];
            if (!items) {
                continue;
            }
            if (items.type == trendType) {
                return items;
            }
        }
        return null;
    },

    /**
     * 获取局类型占比信息
     * @param {*} drawType 
     */
    getDrawTypeRatioInfo(drawType) {
        for (var i = 0; i < this.defaultConfig.drawTypeRatio.length; i++) {
            //下标数据
            var items = this.defaultConfig.drawTypeRatio[i];
            if (!items) {
                continue;
            }
            if (items.type == drawType) {
                return items;
            }
        }
        return null;
    },

    /**
     * 获取基础配置
     */
    getBaseConfig() {
        //返回数据
        var ret = {};
        //匹配规则
        ret.matchingRule = this.toJsonMatchingRule();
        //趋势配置
        ret.trendTypeConfig = this.toJsonTrendTypeConfig();
        //最大配置数量
        ret.drawCountInfo = this.toJsonDrawCountInfo();
        //局数类型比例配置
        ret.drawTypeRatio = [].concat(this.defaultConfig.drawTypeRatio);
        return ret;
    },

    /**
     * 生成数据
     * @param {*} trendType             趋势类型
     * @param {*} matchingRuleType      匹配规则
     * @param {*} serverType            服务类型
     * @param {*} roomLv                房间等级  
     * @param {*} scoreType             分数类型
     * @param {*} cellScore             单元积分
     * @param {*} targetScore           目标分数
     * @param {*} targetCount           目标数量(局数)
     * @param {*} minScore              最小得分(自定义值,传入0使用默认值)
     * @param {*} maxScore              最大得分(自定义值,传入0使用默认值)
     * @param {*} winRatio              输局占比(自定义值,传入0使用默认值)
     * @param {*} lossRatio             输局占比(自定义值,传入0使用默认值)
     */
    createData(trendType, matchingRuleType, serverType, roomLv, scoreType, cellScore, targetScore, targetCount, minScore, maxScore, winRatio, lossRatio) {
        //返回值
        var ret = this.getResetReturnData();
        //声明数组
        ret.data = [];
        //验证初始化结果
        if (this.initDataRet.code == Define.Code.FAIL) {
            return this.initDataRet;
        }
        //验证趋势类型
        var trendTypeInfo = this.getTrendTypeInfo(trendType);
        if (!trendTypeInfo) {
            //设置异常提示
            ret.error = "操作失败,趋势类型参数不合法(未知的类型)!";
            return ret;
        }

        //验证匹配规则类型
        var matchingRule = this.getMatchingRule(matchingRuleType);
        if (!matchingRule) {
            //设置异常提示
            ret.error = "操作失败,匹配规则类型参数不合法(未知的类型)!";
            return ret;
        }

        //获取游戏信息
        var gameInfo = this.getGameInfo(serverType, roomLv, scoreType);
        if (!gameInfo) {
            //设置异常提示
            ret.error = "操作失败,没有找到游戏信息,请检查游戏配置!";
            return ret;
        }

        //单积分判断
        if (cellScore == 0) {
            //设置异常描述
            ret.error = "操作失败,单元积分不能为0,请检查传入的单元积分参数!";
            return ret;
        }

        //验证目标分数
        if (targetScore == 0) {
            //设置异常提示
            ret.error = "操作失败,目标分数参数不合法(目标分数不能等于0)!";
            return ret;
        }

        //局数信息
        var drawCountInfo = this.toJsonDrawCountInfo();
        if (targetCount < drawCountInfo.minDrawCount || targetCount > drawCountInfo.maxDrawCount) {
            //设置异常提示
            ret.error = "操作失败,目标局数参数不合法(目标局数应该在 " + drawCountInfo.minDrawCount + "-" + drawCountInfo.maxDrawCount + "这个区间内)!";
            return ret;
        }

        //最小目标分数
        var minTargetScore = Math.abs(drawCountInfo.minDrawCount * cellScore * gameInfo.controlMutiple);
        //最大目标分数
        var maxTargetScore = Math.abs(drawCountInfo.maxDrawCount * cellScore * gameInfo.controlMutiple);
        //最小
        if (Math.abs(targetScore) < minTargetScore) {
            //设置异常提示
            ret.error = "操作失败,目标分数参数不合法(目标分数的绝对值不能小于" + minTargetScore + ")!";
            return ret;
        }
        //最大
        if (Math.abs(targetScore) > maxTargetScore) {
            //设置异常提示
            ret.error = "操作失败,目标分数参数不合法(目标分数的绝对值不能大于" + maxTargetScore + ")!";
            return ret;
        }

        //最小倍数
        var minMultiplier = 0;
        //最大倍数
        var maxMultiplier = 0;
        //目标分数合法性验证
        {
            //计算需要完成的最小局数
            var minDrawCount = parseInt(Math.abs(targetScore / (cellScore * gameInfo.controlMutiple * gameInfo.maxMultiplier)));
            //判断是否超出1000局
            if (minDrawCount >= drawCountInfo.maxDrawCount) {
                //设置异常提示
                ret.error = "操作失败,目标分数太大,完成目标分数最快需要" + minDrawCount + "局,已超出最大局数" + drawCountInfo.maxDrawCount + "(你可以提高最小得分或最大得分再尝试)!";
                return ret;
            }
        }

        //验证最小,最大分数参数
        if (minScore != 0 && maxScore != 0) {
            //验证最小分数(最小分数不能小于单元积分)
            if (Math.abs(minScore) < cellScore) {
                //设置异常提示
                ret.error = "操作失败,最小得分参数不合法(最小得分不能低于" + cellScore + "(单元积分))!";
                return ret;
            }
            //验证最大分数(最大分数不能小于单元积分)
            if (Math.abs(maxScore) < cellScore) {
                //设置异常提示
                ret.error = "操作失败,最大得分参数不合法(最大得分不能低于" + cellScore + "(单元积分))!";
                return ret;
            }
            //分数验证
            if (Math.abs(minScore) > Math.abs(maxScore)) {
                //设置异常提示
                ret.error = "操作失败,分数区间设置不合法(最小得分不能大于最大得分)!";
                return ret;
            }

            //盈利情况
            if (targetScore > 0) {
                if (maxScore < 0) {
                    //设置异常提示
                    ret.error = "操作失败,最大得分设置不合法(盈利情况下,最大得分应大于0)!";
                    return ret;
                }
            }
            //亏损情况
            else {
                if (minScore > 0) {
                    //设置异常提示
                    ret.error = "操作失败,最小得分设置不合法(亏损情况下,最小得分应小于0)!";
                    return ret;
                }
            }

            //验证最大分数(最大分数不能大于单元积分*最大倍数)
            if (maxScore > (cellScore * gameInfo.maxMultiplier * gameInfo.controlMutiple)) {
                //设置异常提示
                ret.error = "操作失败,最大得分参数不合法(最大分数不能高于" + (cellScore * gameInfo.maxMultiplier * gameInfo.controlMutiple) + "(单元积分*最大倍数))!";
                return ret;
            }
            //设置最小倍数
            minMultiplier = minScore / cellScore / gameInfo.controlMutiple;
            //设置最大倍数
            maxMultiplier = maxScore / cellScore / gameInfo.controlMutiple;
        }
        else if ((minScore != 0 && maxScore == 0) || (minScore == 0 && maxScore != 0)) {
            //设置异常提示
            ret.error = "操作失败,最小,最大得分不合法(a.使用默认值,需要将最小,最大得分都设置为0 b.如需使用最小,最大得分请设置非0的参数)!";
            return ret;
        }
        else {
            //最小倍数
            minMultiplier = gameInfo.minMultiplier;
            //最大倍数
            maxMultiplier = gameInfo.maxMultiplier;
        }

        //验证占比参数
        if (winRatio == 0 && lossRatio == 0) {
            //使用默认配置
            //局类型
            var drawType = 0;
            if (targetScore > 0) {
                drawType = Define.DRAW_TYPE.WIN;
            }
            else {
                drawType = Define.DRAW_TYPE.LOSS;
            }
            //获取局类型配置
            var drawTypeInfo = this.getDrawTypeRatioInfo(drawType);
            if (!drawTypeInfo) {
                //设置异常提示
                ret.error = "操作失败,获取默认的局类型占比参数失败!";
                return ret;
            }
            //设置胜局占比
            winRatio = drawTypeInfo.winRatio;
            //设置输局占比
            lossRatio = drawTypeInfo.lossRatio;
        }
        else {
            //合法性验证
            if (winRatio < 0 || winRatio > 100) {
                //设置异常提示
                ret.error = "操作失败,胜局占比参数不合法(请使用0-100区间之内的值)!";
                return ret;
            }
            //合法性验证
            if (lossRatio < 0 || lossRatio > 100) {
                //设置异常提示
                ret.error = "操作失败,输局占比参数不合法(请使用0-100区间之内的值)!";
                return ret;
            }
            //总占比
            var sumRatio = winRatio + lossRatio;
            //占比参数验证
            if (sumRatio != 100) {
                //设置异常提示
                ret.error = "操作失败,占比参数不合法(胜局占比+输局占比!=100)!";
                return ret;
            }
            //盈利情况
            if (targetScore > 0) {
                if (winRatio <= 0) {
                    //设置异常提示
                    ret.error = "操作失败,胜局占比参数不合法(盈利情况下,胜局占比必须大于0)!";
                    return ret;
                }
            }
            //亏损情况
            else {
                if (lossRatio <= 0) {
                    //设置异常提示
                    ret.error = "操作失败,输局占比参数不合法(亏损情况下,输局占比必须大于0)!";
                    return ret;
                }
            }
        }

        //验证占比的局数是否合理
        {
            //胜利局数
            var winDrawCount = parseInt(targetCount * (winRatio / 100));
            //失败局数
            var lossDrawCount = parseInt(targetCount * (lossRatio / 100));
            //局数和
            var lSumDrawCount = winDrawCount + lossDrawCount;
            if (lSumDrawCount <= 0) {
                //设置异常提示
                ret.error = "操作失败,生成的总局数<=0(提升目标局数或检查赢局,输局占比)!";
                return ret;
            }
        }

        //创建随机趋势数据
        var trendData = this.createTrendData(trendType, matchingRuleType, cellScore, targetScore, targetCount, minMultiplier, maxMultiplier, winRatio, lossRatio, gameInfo);
        //总计数据
        for (var i = 0; i < trendData.length; i++) {
            //下标数据
            var itemData = trendData[i];
            //定义对象
            var addData = {};
            //游戏数据信息
            var dataInfo = this.getDataInfo(serverType, roomLv, scoreType, cellScore, itemData);
            //数据
            addData.data = [].concat(dataInfo.data);
            //数据分数
            addData.dataScore = [].concat(dataInfo.dataScore);
            //数据量
            addData.length = dataInfo.data.length;
            //获取数据得分
            addData.score = dataInfo.score;
            //预期分数差值
            addData.diffScore = targetScore - addData.score;
            //预期局数差值
            addData.diffDrawCount = Math.abs(targetCount - addData.data.length);
            //胜局总得分
            addData.winScore = dataInfo.winScore;
            //输局总得分
            addData.lossScore = dataInfo.lossScore;
            //最终得分
            addData.sumScore = dataInfo.sumScore;
            //胜局次数
            addData.winCount = dataInfo.winCount;
            //输局次数
            addData.lossCount = dataInfo.lossCount;
            //胜局占比
            addData.winRatio = dataInfo.winRatio;
            //输局占比
            addData.lossRatio = dataInfo.lossRatio;
            //重复数据
            addData.repeatData = [].concat(dataInfo.repeatData);
            //最大重复比
            addData.maxRepeatRatio = dataInfo.maxRepeatRatio;
            //重复比评测
            addData.repeatRatioEvaluationDesc = dataInfo.repeatRatioEvaluationDesc;
            //分差评测
            addData.diffScoreEvaluationDesc = this.getDiffScoreEvaluationDesc(targetScore, addData.sumScore, cellScore, gameInfo.controlMutiple);
            //添加数据
            ret.data.push(addData);
        }
        //设置返回值
        ret.code = Define.Code.SUCCESS;
        return ret;
    },

    /**
     * 获取数据的总分值
     * @param {*} pointData         点数据
     * @param {*} cellScore         单元积分
     * @param {*} controlMutiple    控制倍数
     */
    getSumDataScore(pointData, cellScore, controlMutiple) {
        //返回值
        var ret = {};
        //总计得分
        ret.lSumScore = 0;
        //赢局得分
        ret.lWinScore = 0;
        //输局得分
        ret.lLossScore = 0;
        for (var i = 0; i < pointData.length; i++) {
            //下标数据
            var value = pointData[i];
            if (value > 0) {
                //分数累加
                ret.lWinScore += cellScore * value * controlMutiple;
            }
            else {
                //分数累加
                ret.lLossScore += cellScore * value * controlMutiple;
            }
        }
        ret.lSumScore = ret.lWinScore + ret.lLossScore;
        return ret;
    },

    /**
     * 获取数据的数组分数
     * @param {*} pointData 
     * @param {*} cellScore 
     * @param {*} controlMutiple 
     */
    getDataArrayScore(pointData, cellScore, controlMutiple) {
        //返回值
        var data = [];
        for (var i = 0; i < pointData.length; i++) {
            //下标数据
            var value = pointData[i];
            data.push(cellScore * value * controlMutiple);
        }
        return data;
    },

    /**
     * 获取重复占比评测
     * @param {*} value 
     */
    getRepeatRatioEvaluationDesc(value) {
        //返回值
        var ret = "";
        if (value < 25) {
            ret = "优";
        }
        else if (value < 50) {
            ret = "良";
        }
        else if (value < 75) {
            ret = "差(建议:可以尝试调整目标分数,局数,最小得分,最大得分,以达到最优!)";
        }
        else if (value < 100) {
            ret = "极差(建议:可以尝试调整目标分数,局数,最小得分,最大得分,以达到最优!)";
        }
        return ret;
    },

    /**
     * 获取分差评测
     * @param {*} targetScore 
     * @param {*} sumDataScore 
     * @param {*} sumDataScore 
     */
    getDiffScoreEvaluationDesc(targetScore, sumDataScore, cellScore, controlMutiple) {
        //返回值
        var ret = "";
        //分差
        var diffScore = targetScore - sumDataScore;
        //计算已达到的期望值
        var sumDisiredValCount = Math.abs(sumDataScore / cellScore / controlMutiple);
        //最大期望值
        var maxDisiredValCount = Math.abs(targetScore / cellScore / controlMutiple);
        //计算差比
        var diffRatio = Math.abs((100 - (parseInt(sumDisiredValCount / maxDisiredValCount)) * 100));
        //最大数量
        if (diffRatio < 25) {
            ret = "优";
        }
        else if (diffRatio < 50) {
            ret = "良";
        }
        else if (diffRatio < 75) {
            ret = "差(建议:可以尝试调整目标分数,局数,最小得分,最大得分,以达到最优!)";
        }
        else if (diffRatio < 100) {
            ret = "极差(建议:可以尝试调整目标分数,局数,最小得分,最大得分,以达到最优!)";
        }
        return ret;
    },

    /**
     * 获取数据局数信息
     * @param {*} pointData 
     */
    getPointDataDrawInfo(pointData) {
        //返回数据
        var ret = {};
        //胜局数量
        ret.winCount = 0;
        //输局数量
        ret.lossCount = 0;
        //最大重复比
        ret.maxRepeatRatio = 0;
        //重复数据(只显示前10的数据)
        ret.repeatData = [];
        //计算输局与胜局数量
        {
            for (var i = 0; i < pointData.length; i++) {
                //下标数据
                var value = pointData[i];
                if (value > 0) {
                    ret.winCount++;
                }
                else {
                    ret.lossCount++;
                }
            }
            //胜局占比
            ret.winRatio = Math.abs(Math.ceil(((ret.winCount / pointData.length) * 100)));
            //输局占比
            ret.lossRatio = Math.abs(Math.ceil(((ret.lossCount / pointData.length) * 100)));
        }
        //计算重复的数据
        {
            //临时数组
            var repeatDataTemp = [];
            //统计数据
            for (var i = 0; i < pointData.length; i++) {
                //下标数据
                var value = pointData[i];
                //存在的信息
                var dataItem = null;
                //查询存在的数据
                for (var j = 0; j < repeatDataTemp.length; j++) {
                    if (repeatDataTemp[j].value == value) {
                        dataItem = repeatDataTemp[j];
                        break;
                    }
                }
                //添加数据
                if (dataItem == null) {
                    var addData = {};
                    //值
                    addData.value = value;
                    //重复次数
                    addData.count = 1;
                    //添加数据
                    repeatDataTemp.push(addData);
                }
                //更新数据
                else {
                    dataItem.count++;
                }
            }
            //排序(重复数据大到小)
            for (var i = 0; i < repeatDataTemp.length - 1; i++) {
                for (var j = 0; j < repeatDataTemp.length - i - 1; j++) {
                    if (repeatDataTemp[j].count < repeatDataTemp[j + 1].count) {
                        var temp = repeatDataTemp[j];
                        repeatDataTemp[j] = repeatDataTemp[j + 1];
                        repeatDataTemp[j + 1] = temp;
                    }
                }
            }
            //设置最大重复比
            ret.maxRepeatRatio = Math.abs(Math.ceil((repeatDataTemp[0].count / pointData.length) * 100));
            //拷贝数据
            for (var i = 0; i < Math.min(repeatDataTemp.length, 1); i++) {
                ret.repeatData.push(repeatDataTemp[i]);
            }
        }
        return ret;
    },

    /**
     * 生成随机的点数据
     * @param {*} count             数量(局数) 
     * @param {*} minMultiplier     最小倍数
     * @param {*} maxMultiplier     最大倍数
     */
    createRandPointData(count, minMultiplier, maxMultiplier) {
        //定义返回数据
        var data = [];
        //循环生成
        for (var i = 0; i < count;) {
            //生成随机值
            var randValue = this.RandInt(minMultiplier, maxMultiplier);
            if (randValue == 0) {
                continue;
            }
            //添加数据
            data.push(randValue);
            //下标累加
            i++;
        }
        return data;
    },

    /**
     * 生成目标分数的数字
     * @param {*} score     目标分数
     * @param {*} count     目标数量
     * @param {*} minScore  最小分数
     * @param {*} maxScore  最大分数
     */
    randTargetScoreNumber(score, count, minScore, maxScore) {
        //返回的数组
        var arrrayRet = [];
        //总分数(拷贝)
        var scoreTemp = score;
        //使用掉的分数总和
        var useSumScore = 0;
        for (var i = 0; i < count - 1; i++) {
            //生成随机数
            var randValue = 0;
            if (scoreTemp >= 2) {
                randValue = this.RandInt(1, scoreTemp / 2);
            }
            else {
                randValue = this.RandInt(1, scoreTemp);
            }
            if (randValue == 0) {
                continue;
            }
            //添加数据
            arrrayRet.push(randValue);
            //减去使用的分数
            scoreTemp -= randValue;
            //累加用掉的分数
            useSumScore += randValue;
        }
        //分差值
        var diffScore = score - useSumScore;
        if (diffScore > maxScore) {
            //增加生成次数
            var addCount = diffScore;
            for (var i = 0; i < addCount; i++) {
                //生成随机数
                var randValue = 0;
                if (diffScore >= 2) {
                    randValue = this.RandInt(1, diffScore / 2);
                }
                else {
                    randValue = this.RandInt(1, diffScore);
                }
                //添加数据
                arrrayRet.push(randValue);
                //减去使用的分数
                diffScore -= randValue;
                if (diffScore < minScore) {
                    break;
                }
            }
        }
        //添加最终的参数
        if (diffScore != 0) {
            //添加数据
            arrrayRet.push(diffScore);
        }
        return arrrayRet;
    },

    /**
     * 微调点数据
     * @param {*} trendType       趋势类型
     * @param {*} pointData       点的数据
     * @param {*} minMultiplier   最小倍数
     * @param {*} maxMultiplier   最大倍数
     */
    fineTuningPointData(trendType, pointData, minMultiplier, maxMultiplier) {
        //拷贝数据
        var pointDataTemp = [].concat(pointData);
        //数据长度验证
        if (pointDataTemp.length == 0) {
            //处理失败,返回传入的数据
            return pointData;
        }

        //获取趋势属性
        var trendTypeInfo = this.getTrendTypeInfo(trendType);
        if (trendTypeInfo == null) {
            //处理失败,返回传入的数据
            return pointData;
        }

        //累计抽取的值
        var siphonSumValue = 0;
        //累计抽取的次数
        var siphonSumCount = 0;
        //偏移量
        var siphonOffsetIndex = 0;
        //循环处理
        for (var i = 0; i < pointDataTemp.length; i++) {
            //偏移量判断
            if (i != siphonOffsetIndex) {
                continue;
            }
            //下标数据
            var value = pointDataTemp[i];
            //验证点值能否被抽取(点值需大于抽取倍数)
            if (Math.abs(value) < trendTypeInfo.siphonMutiple) {
                continue;
            }
            //抽取点值
            var tempValue = parseInt(value / trendTypeInfo.siphonMutiple);
            if (tempValue == 0) {
                continue;
            }
            //生成随机数
            var randValue = this.RandInt(1, tempValue);
            if (value - randValue == 0) {
                continue;
            }
            //累加抽取的点数
            siphonSumValue += randValue;
            //抽取次数累加
            siphonSumCount++;
            //减去抽取的点数
            pointDataTemp[i] -= randValue;
            //偏移量增加
            siphonOffsetIndex += trendTypeInfo.siphonOffsetValue;
        }

        //随机趋势
        if (trendType == Define.TREND_TYPE.RAND) {
            //判断抽取的值
            if (siphonSumValue != 0) {
                //生成随机数
                var randData = this.randTargetScoreNumber(siphonSumValue, siphonSumCount, minMultiplier, maxMultiplier);
                //判断随机数据
                if (randData.length > 0) {
                    //随机复原数据(最多进行1W次处理,超出就退出)
                    for (var i = 0; i < 10000; i++) {
                        //数组下标数据(存储可用的下标)
                        var pointIndexArray = [];
                        for (var j = 0; j < pointDataTemp.length; j++) {
                            //下标数据
                            var value = pointDataTemp[j];
                            //添加数据
                            var addData = {};
                            //下标
                            addData.index = j;
                            //值
                            addData.value = value;
                            //差值
                            addData.diffValue = 0;
                            //盈利数据
                            if (value > 0) {
                                addData.diffValue = maxMultiplier - value;
                            }
                            //亏损模式
                            else {
                                addData.diffValue = minMultiplier - value;
                            }
                            //差值不等于0
                            if (addData.diffValue == 0) {
                                continue;
                            }
                            //添加数据
                            pointIndexArray.push(addData);
                        }
                        if (pointIndexArray.length == 0) {
                            break;
                        }
                        //随机下标
                        var randIndex = this.RandInt(0, pointIndexArray.length);
                        //console.log("1 randIndex:%d pointIndexArray:%s randData:%s",randIndex,JSON.stringify(pointIndexArray),JSON.stringify(randData));
                        //随机配置
                        var randInfo = pointIndexArray[randIndex];
                        //读取头部数据
                        var randHeadValue = randData[0];
                        //console.log("randInfo:%s randHeadValue:%d",JSON.stringify(randInfo),randHeadValue);
                        if (Math.abs(randHeadValue) > Math.abs(randInfo.diffValue)) {
                            //加入数据
                            pointDataTemp[randInfo.index] += randInfo.diffValue;
                            //减去加上的数据
                            randData[0] -= randInfo.diffValue;
                        }
                        else {
                            //加入数据
                            pointDataTemp[randInfo.index] += randHeadValue;
                            //删除头部数据
                            randData.splice(0, 1);
                        }
                        //console.log("2 randIndex:%d pointIndexArray:%s randData:%s",randIndex,JSON.stringify(pointIndexArray),JSON.stringify(randData));
                        //判断数据是否处理完成
                        if (randData.length == 0) {
                            break;
                        }
                    }
                }
                else {
                    //处理失败,返回传入的数据
                    return pointData;
                }
            }
            else {
                //处理失败,返回传入的数据
                return pointData;
            }
        }
        else {
            //处理失败,返回传入的数据
            return pointData;
        }
        return pointDataTemp;
    },

    /**
     * 生成点数据
     * @param {*} trendType         趋势类型
     * @param {*} matchingRuleType  匹配类型
     * @param {*} count             数量(局数)
     * @param {*} targetScore       目标分数
     * @param {*} cellScore         单元积分
     * @param {*} minMultiplier     最小倍数
     * @param {*} maxMultiplier     最大倍数
     * @param {*} controlMutiple    控制倍数
     * @param {*} gameInfo          游戏信息
     * 
     */
    createPointData(trendType, matchingRuleType, count, targetScore, cellScore, minMultiplier, maxMultiplier, controlMutiple, gameInfo) {
        //返回值
        var retData = [];
        {
            var randValueArray = [];
            //局数变量
            var countTemp = count;
            //平均一局需要的得分
            var lDrawGetScore = 0;
            //优先匹配分数区间
            if (matchingRuleType == Define.MATCHING_RULE.SCORE_INTERVAL) {
                //公式说明:目标分数/(((最大倍数-最小倍数)/2)*单元积分*控制倍数)
                lDrawGetScore = parseInt(targetScore / (((maxMultiplier - minMultiplier) / 2) * cellScore * controlMutiple));
            }
            //优先匹配局数(默认)
            else {
                lDrawGetScore = parseInt(targetScore / countTemp);
            }
            //平均一局需要的期望值(四舍五入)
            var lDrawDisiredVal = Math.round(lDrawGetScore / controlMutiple / cellScore);
            //期望值验证
            {
                //盈利情况
                if (targetScore > 0) {
                    //判断期望值是否小于最小倍数
                    if (lDrawDisiredVal < gameInfo.minMultiplier) {
                        lDrawDisiredVal = gameInfo.minMultiplier;
                    }
                    //判断期望值是否大于最大倍数
                    else if (lDrawDisiredVal > gameInfo.maxMultiplier) {
                        lDrawDisiredVal = gameInfo.maxMultiplier;
                    }
                }
                //亏损情况
                else {
                    if (lDrawDisiredVal < -gameInfo.maxMultiplier) {
                        lDrawDisiredVal = -gameInfo.maxMultiplier;
                    }
                    else if (lDrawDisiredVal > -gameInfo.minMultiplier) {
                        lDrawDisiredVal = -gameInfo.minMultiplier;
                    }
                }
            }

            //初始化数组
            for (var i = 0; i < countTemp; i++) {
                //设置平均值
                randValueArray[i] = lDrawDisiredVal;
            }

            //验证点数量是否足够
            {
                //点的分数信息
                var pointDataScoreInfo = this.getSumDataScore(randValueArray, cellScore, controlMutiple);
                //累计分数
                var lSumScore = pointDataScoreInfo.lSumScore;
                //平均一局的分数
                var lDrawGetScore = lDrawDisiredVal * controlMutiple * cellScore;
                //目标分数与当前得分差
                var diffScore = targetScore - lSumScore;
                //拷贝分差值
                var diffScoreTemp = diffScore;
                //分差超过一个单元积分,则需要进行补位
                if (Math.abs(diffScoreTemp) > cellScore) {
                    //计算最大补位
                    var maxAddPointCount = Math.abs(Math.ceil(diffScoreTemp / (controlMutiple * cellScore)));
                    //循环添加补位
                    for (var i = 0; i < maxAddPointCount; i++) {
                        //获取补位期望值
                        var addDisiredVal = Math.ceil(diffScoreTemp / (controlMutiple * cellScore));
                        //盈利情况
                        if (targetScore > 0) {
                            addDisiredVal = Math.min(addDisiredVal, lDrawDisiredVal);
                        }
                        //亏损情况
                        else {
                            addDisiredVal = Math.max(addDisiredVal, lDrawDisiredVal);
                        }
                        if (addDisiredVal == 0) {
                            continue;
                        }
                        //添加补位
                        randValueArray.push(addDisiredVal);
                        //减去使用掉的分数
                        diffScoreTemp -= lDrawGetScore;
                        //盈利情况
                        if (targetScore > 0) {
                            //判断分差值是否够使用
                            if (diffScoreTemp < cellScore) {
                                break;
                            }
                        }
                        //亏损情况
                        else {
                            //判断分差值是否够使用
                            if (diffScoreTemp > cellScore) {
                                break;
                            }
                        }
                    }
                }
            }

            //点的分数信息
            var pointDataScoreInfo = this.getSumDataScore(randValueArray, cellScore, controlMutiple);
            //累计分数
            var lSumScore = pointDataScoreInfo.lSumScore;
            //目标分数与当前得分差
            var diffScore = targetScore - lSumScore;
            //微调整数据
            var data = this.fineTuningPointData(trendType, randValueArray, minMultiplier, maxMultiplier);
            //定义对象
            var addData = {};
            addData.data = [].concat(data);
            //添加数据
            retData.push(addData);
        }
        return retData;
    },

    /**
     * 生成趋势的数据
     * @param {*} trendType         趋势类型
     * @param {*} matchingRuleType  匹配规则
     * @param {*} cellScore         单元积分
     * @param {*} targetScore       目标分数
     * @param {*} targetCount       目标数量(局数)
     * @param {*} minMultiplier     最小倍数
     * @param {*} maxMultiplier     最大倍数
     * @param {*} winRatio          胜局占比
     * @param {*} lossRatio         输局占比
     * @param {*} gameInfo          游戏信息
     */
    createTrendData(trendType, matchingRuleType, cellScore, targetScore, targetCount, minMultiplier, maxMultiplier, winRatio, lossRatio, gameInfo) {
        //目标得分(拷贝)
        var targetScoreTemp = targetScore;
        //胜利得分
        var winSumScore = 0;
        //胜利局数
        var winDrawCount = parseInt(targetCount * (winRatio / 100));
        //失败得分
        var lossSumScore = 0;
        //失败局数
        var lossDrawCount = parseInt(targetCount * (lossRatio / 100));
        //主数据
        var mainData = [];
        //子数据
        var subData = [];
        //返回的数据
        var data = [];
        //盈利情况(先生成亏损的数据,再补盈利的数据)
        if (targetScore > 0) {
            //生成亏损的数据
            subData = this.createRandPointData(lossDrawCount, -Math.abs(maxMultiplier), Math.abs(minMultiplier));
            //点的分数信息
            var pointDataScoreInfo = this.getSumDataScore(subData, cellScore, gameInfo.controlMutiple);
            //累计分数
            var lossPointDataScore = pointDataScoreInfo.lSumScore;
            //设置目标得分
            targetScoreTemp = targetScoreTemp - lossPointDataScore;
            //生成盈利的数据
            mainData = this.createPointData(trendType, matchingRuleType, winDrawCount, targetScoreTemp, cellScore, Math.abs(minMultiplier), Math.abs(maxMultiplier), gameInfo.controlMutiple, gameInfo);
        }
        //亏损情况(先生成盈利的数据,再补亏损的数据)
        else {
            //生成盈利的数据
            subData = this.createRandPointData(winDrawCount, Math.abs(minMultiplier), Math.abs(maxMultiplier));
            //点的分数信息
            var pointDataScoreInfo = this.getSumDataScore(subData, cellScore, gameInfo.controlMutiple);
            //累计分数
            var profitPointDataScore = pointDataScoreInfo.lSumScore;
            //设置目标得分
            targetScoreTemp = targetScoreTemp - profitPointDataScore;
            //生成亏损的数据
            mainData = this.createPointData(trendType, matchingRuleType, lossDrawCount, targetScoreTemp, cellScore, -Math.abs(maxMultiplier), -Math.abs(minMultiplier), gameInfo.controlMutiple, gameInfo);
        }

        //整理数据
        for (var i = 0; i < mainData.length; i++) {
            //下标数据
            var items = mainData[i];
            if (!items) {
                continue;
            }
            //拷贝方案数组
            var planeDataTemp = [].concat(items.data);
            //连接数据
            var allDataTemp = planeDataTemp.concat(subData);
            if (allDataTemp.length == 0) {
                continue;
            }
            //随机打乱数据
            var randData = this.RandArrayData(allDataTemp);
            //添加数据
            data.push(randData);
        }
        return data;
    },


    /**获取数据信息
     * @param {*} serverType            服务类型
     * @param {*} roomLv                房间等级  
     * @param {*} scoreType             分数类型
     * @param {*} cellScore             单元积分
     * @param {*} data                  数据数组(一维数组)
     */
    getDataInfo(serverType, roomLv, scoreType, cellScore, data) {
        //返回值
        var ret = this.getResetReturnData();
        //获取游戏信息
        var gameInfo = this.getGameInfo(serverType, roomLv, scoreType);
        if (!gameInfo) {
            //设置异常提示
            ret.error = "操作失败,没有找到游戏信息,请检查游戏配置!";
            return ret;
        }

        //单积分判断
        if (cellScore == 0) {
            //设置异常描述
            ret.error = "操作失败,单元积分不能为0,请检查传入的单元积分参数!";
            return ret;
        }

        //数据数组判断
        if (data.length == 0) {
            //设置异常描述
            ret.error = "操作失败,数据长度为0,请检查传入的数据!";
            return ret;
        }

        //返回的数据
        var retData = {};
        //分析数据
        {
            //数据
            retData.data = [].concat(data);
            //数据量
            retData.length = data.length;
            //点的分数信息
            var pointDataScoreInfo = this.getSumDataScore(data, cellScore, gameInfo.controlMutiple);
            //获取数组分数
            retData.dataScore = this.getDataArrayScore(data, cellScore, gameInfo.controlMutiple);
            //累计分数
            retData.score = pointDataScoreInfo.lSumScore;
            //赢局,输局占比信息
            {
                //占比信息
                var drawInfo = this.getPointDataDrawInfo(data);
                //胜局总得分
                retData.winScore = pointDataScoreInfo.lWinScore;
                //输局总得分
                retData.lossScore = pointDataScoreInfo.lLossScore;
                //最终得分
                retData.sumScore = retData.winScore + retData.lossScore;
                //胜局次数
                retData.winCount = drawInfo.winCount;
                //输局次数
                retData.lossCount = drawInfo.lossCount;
                //胜局占比
                retData.winRatio = drawInfo.winRatio;
                //输局占比
                retData.lossRatio = drawInfo.lossRatio;
                //重复数据
                retData.repeatData = [].concat(drawInfo.repeatData);
                //最大重复比
                retData.maxRepeatRatio = drawInfo.maxRepeatRatio;
                //重复比评测
                retData.repeatRatioEvaluationDesc = this.getRepeatRatioEvaluationDesc(drawInfo.maxRepeatRatio);
            }
        }
        return retData;
    },

    /**
     * 获取匹配规则
     */
    toJsonMatchingRule() {
        return this.matchingRule;
    },

    /**
     * 获取趋势类型JSON数据
     */
    toJsonTrendTypeConfig() {
        var data = [];
        for (var i = 0; i < this.trendTypeConfig.length; i++) {
            //下标数据
            var items = this.trendTypeConfig[i];
            if (!items) {
                continue;
            }
            //添加数据
            var addData = {};
            addData.type = items.type;
            addData.desc = items.desc;
            //添加数据
            data.push(addData);
        }
        return data;
    },

    /**
     * 获取最大点数
     */
    toJsonDrawCountInfo() {
        //返回变量
        var ret = {};
        ret.minDrawCount = this.defaultConfig.minDrawCount;
        ret.maxDrawCount = this.defaultConfig.maxDrawCount;
        return ret;
    },

    /**
     * 获取游戏信息
     * @param {*} serverType    服务类型
     * @param {*} roomLv        房间等级
     * @param {*} scoreType     分数类型
     * @param {*} cellScore     单元积分
     */
    toJsonGameInfo(serverType, roomLv, scoreType, cellScore) {
        //游戏的主要信息
        var mainGameInfo = null;
        //房间信息
        var roomGameInfo = null;
        //循环查找
        for (var i = 0; i < this.ControlConfig.length; i++) {
            //下标数据
            var mainItem = this.ControlConfig[i];
            if (!mainItem) {
                continue;
            }
            //服务类型判断
            if (mainItem.servertype == serverType) {
                //循环查找
                for (var j = 0; j < mainItem.data.length; j++) {
                    //下标数据
                    var subItem = mainItem.data[j];
                    if (subItem.roomLv == roomLv && subItem.scoreType == scoreType) {
                        mainGameInfo = mainItem;
                        roomGameInfo = subItem;
                        break;
                    }
                }
            }
        }
        //验证游戏信息
        if (mainGameInfo != null && roomGameInfo != null) {
            //设置返回值
            var ret = {};
            //服务名称
            ret.servername = mainGameInfo.servername;
            //服务类型
            ret.servertype = mainGameInfo.servertype;
            //房间等级
            ret.roomLv = roomGameInfo.roomLv;
            //分数类型
            ret.scoreType = roomGameInfo.scoreType == 1 ? "金豆" : "元宝";
            //最小赢分
            ret.minWinScore = cellScore * roomGameInfo.controlMutiple * roomGameInfo.minMultiplier;
            //最大赢分
            ret.maxWinScore = cellScore * roomGameInfo.controlMutiple * roomGameInfo.maxMultiplier;
            //最小输分
            ret.minLossScore = -ret.minWinScore;
            //最大输分
            ret.maxLossScore = -ret.maxWinScore;
            //提示
            ret.tip = mainGameInfo.tip;
            return ret;
        }
        return null;
    }
}