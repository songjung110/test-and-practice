var template =
    '' +
    '<div class="dcp_scroll" style="width: 100%">' +
    '     <div ref="scroll" class="scroll" style="width: 90%;" @click.self="clickBarPosition">' +
    '         <span ref="bOne" class="bullet b_one" :style="startBullet" :class="{ active : this.dragging ? ( this.target == this.$refs.bOne ) : false }" @mousedown="startDrag">{{ val.x }}</span>' +
    '         <span ref="bTwo" class="bullet b_two" :style="endBullet" :class="{ active : this.dragging ? ( this.target == this.$refs.bTwo ) : false }" @mousedown="startDrag">{{ val.x2 }}</span>' +
    // +   '         <span ref="bTwo" class="bullet b_two" :style="endBullet" :class="{ \'active\' : classActive }" @mousedown="startDrag">{{ val.x2 }}</span>'
    '         <div ref="bar"class="bar" :class="{ active : this.dragging ? ( this.target == this.$refs.bar ) : false }" @mousedown="startDrag" :style="barPosition"></div>' +
    '     </div>' +
    ' </div>';

var comp = Vue.component('comp-scroll', {
    template: template,
    props: ['value'],
    data: function () {
        return {
            dragging: false,
            isActive: false,
            startP: 0, // 마우스 시작 지점
            startOffsetP: 0, // 왼쪽 불릿 처음 위치
            endOffsetP: 0, // 오른쪽 불릿 처음 위치
            movePercent: 0, // 마우스 움직인 퍼센테이지 계산값
            target: 0,
            clickBarP: 0, //스크롤 내 background 클릭 위치
        };
    },
    computed: {
        val: {
            get: function () {
                return this.value;
            },
            set: function ($val) {
                this.$emit('input', $val);
            },
        },
        startBullet: function () {
            return { left: this.val.x + '%' };
        },
        endBullet: function () {
            return { left: this.val.x2 + '%' };
        },
        barPosition: function () {
            return { left: this.val.x + '%', right: 100 - this.val.x2 + '%' };
        },
    },
    watch: {},
    mounted: function () {
        // console.log( this.val )
    },
    methods: {
        startDrag: function (e) {
            this.dragging = true;
            var _this = this;
            this.target = e.target;

            var leftPxPosition = this.$refs.bOne.getBoundingClientRect().left + 10 - this.$refs.scroll.getBoundingClientRect().left;
            var rightPxPosition = this.$refs.bTwo.getBoundingClientRect().left + 10 - this.$refs.scroll.getBoundingClientRect().left;

            var nowScrollBar = Number(this.val.x2 - this.val.x).toFixed(1);

            this.startOffsetP = Number(leftPxPosition);
            this.endOffsetP = Number(rightPxPosition);
            this.startP = e.pageX;

            document.addEventListener('mousemove', function (e) {
                if (_this.dragging) {
                    var startOffsetPx = _this.startOffsetP; // 스크롤 내 클릭 위치 px단위 //왼
                    var endOffsetPx = _this.endOffsetP; // 스크롤 내 클릭 위치 px단위 //오
                    var startPx = _this.startP; // 페이지 내 클릭 위치 px ( 마우스 이동 px )
                    var mousePos = e.pageX; // 페이지 내 마우스 움직인 위치 px ( 마우스 이동 px )
                    var movePos = mousePos - startPx;
                    var leftPxPosition = Number(startOffsetPx + movePos) > 0 ? Number(startOffsetPx + movePos) : 0;
                    var RightPxPosition = Number(endOffsetPx + movePos) > 0 ? Number(endOffsetPx + movePos) : 0;
                    var leftComp = ((leftPxPosition / _this.$refs.scroll.getBoundingClientRect().width) * 100).toFixed(1);
                    var rightComp = ((RightPxPosition / _this.$refs.scroll.getBoundingClientRect().width) * 100).toFixed(1);
                    if (_this.target == _this.$refs.bOne) {
                        _this.val.x = leftComp > 99 ? 99 : leftComp > Number(_this.val.x2) - 1 ? Number(_this.val.x2) - 1 : leftComp;
                    } else if (_this.target == _this.$refs.bTwo) {
                        _this.val.x2 = rightComp > 100 ? 100 : rightComp < Number(_this.val.x) + 1 ? Number(_this.val.x) + 1 : rightComp;
                    } else if (_this.target == _this.$refs.bar) {
                        _this.val.x = leftComp > 100 ? 100 : leftComp > Number(_this.val.x2) ? Number(_this.val.x2) - 1 : leftComp;
                        _this.val.x2 = rightComp > 100 ? 100 : rightComp < Number(_this.val.x) ? Number(_this.val.x) + 1 : rightComp;
                        if (_this.val.x == 0) {
                            _this.val.x2 = nowScrollBar;
                        } else if (_this.val.x2 == 100) {
                            _this.val.x = 100 - nowScrollBar;
                        }
                    }
                }
            });
            document.addEventListener('mouseup', function (e) {
                _this.dragging = false;
                _this.target = null;
            });
        },
    },
    clickBarPosition: function (e) {
        this.clickBarP = e.offsetX;
        var nowScrollBarHalf = ((this.val.x2 - this.val.x) / 2).toFixed(1);
        var clickBarP = ((this.clickBarP / this.$refs.scroll.clientWidth) * 100).toFixed(1);
        this.val.x = Number(clickBarP) - Number(nowScrollBarHalf) > 0 ? (Number(clickBarP) - Number(nowScrollBarHalf)).toFixed(1) : 0;
        this.val.x2 = Number(clickBarP) + Number(nowScrollBarHalf) < 100 ? (Number(clickBarP) + Number(nowScrollBarHalf)).toFixed(1) : 100;

        if (this.val.x == 0) {
            this.val.x2 = Number(nowScrollBarHalf) * 2;
        } else if (this.val.x2 == 100) {
            this.val.x = 100 - Number(nowScrollBarHalf) * 2;
        }
    },
});
