var template = ''
    +   '<div class="dcp_scroll" style="width: 100%">'
    +   '     <div ref="scroll" class="scroll" style="width: 90%;">'
    +   '         <span ref="bOne" class="bullet b_one" :style="startBullet" @mousedown="evt_mouseDown">{{ x }}</span>'
    +   '         <span ref="bTwo" class="bullet b_two" :style="endBullet">{{ x2 }}</span>'
    +   '         <div class="bar" :style="barPosition"></div>'
    +   '     </div>'
    +   '     <span>{{ mouseP }}</span>'
    +   ' </div>'

var comp = Vue.component( "comp-scroll", {
    template: template,
    props: [ 'x' ,  'x2','style' ],
    data: function() {
        return {
            dragging : false,
            x: 0,
            x2: 0,
            startP : 0, // 마우스 시작 지점
            endP : 0, // 마우스 끝 지점
            offsetP : 0, // 불릿 처음 위치
            down: 0,
            move: 0,
            mouseP : this.mouseP
        }
    },
    computed: {
        startBullet : function(){
            return { left : this.x + "%" };
        },
        endBullet : function(){
            return { left : this.x2 + "%" };
        },
        barPosition : function (){
            return { left : this.x + "%" , right: ( 100 - this.x2 ) + "%" };
        }
    },
    watch : {
        // dragging 은 계속 바뀌지 않으므로 쓰면 X
        mouseP : function( $val ){
            console.log( $val )
        },

    },
    mounted : function(e){
        // $( document ).mousemove( function(){
        //     console.log( "asdfasdf" );
        // })
    },
    methods : {
        evt_mouseDown: function( $e ){
            console.log( "asdfsadf" );
        },
        bulletPosition : function(e){
            // var offsetPx = this.offsetP // 스크롤 내 클릭 위치 px단위

            // var startPx = this.startP // 페이지 내 클릭 위치 px ( 마우스 이동 px )
            // var mousePos = e.pageX // 페이지 내 마우스 움직인 위치 px ( 마우스 이동 px )
            // var movePos = mousePos - startPx

            // if( e.target == this.$refs.bOne ) {

            //     var leftPxPosition = Number( offsetPx + movePos ) > 0 ? Number( offsetPx + movePos ) : 0;
            //     this.x = ( ( leftPxPosition / $( this.$refs.scroll ).width() ) * 100 ).toFixed( 1 ); // x값 % 갱신

            // } else if( e.target == this.$refs.bTwo ) {

            //     var RightPxPosition = Number( offsetPx + movePos ) > 0 ? Number( offsetPx + movePos ) : 0;
            //     this.x2 = ( ( RightPxPosition /$( this.$refs.scroll ).width() ) * 100 ).toFixed( 1 ); // x2값 % 갱신

            // }

            if( e.target == this.$refs.bOne ) {
                console.log("a");
            } else if( e.target == this.$refs.bTwo ) {

            }


        },
        mousePosition : function(e){
            // console.log( e )
        }

    }
})