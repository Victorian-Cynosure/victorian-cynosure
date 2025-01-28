$(document).ready(function() {
    // 載入書本頁面
    function loadBook() {
        // 確保迴圈只載入 32 頁
        for (let i = 1; i <= 32; i++) {
            $('#book').append(`
                <div class="page ${i === 1 ? 'hard' : ''}">
                    <img src="book/自主成發小冊6_page_${i}.jpg" 
                         alt="第 ${i} 頁"
                         style="width: 100%; height: 100%; object-fit: contain;">
                </div>
            `);
        }

        // 修改 turn.js 的初始化設定
        $('#book').turn({
            display: 'double',
            acceleration: true,
            gradients: true,
            elevation: 0,
            autoCenter: true,
            separation: 0,
            
            // 修改翻頁相關設定
            duration: 600,           // 縮短動畫時間使其更靈敏
            corners: 'all',         // 允許所有角落都可以翻頁
            cornerSize: 200,        // 增加感應區域
            allowTouchMove: true,   // 允許觸控移動
            
            // 滑鼠事件處理
            when: {
                turning: function(e, page, view) {
                    // 移除第一頁的限制
                    // if (page == 1) {
                    //     e.preventDefault();
                    //     return;
                    // }
                },
                start: function(e, pageObject, corner) {
                    if (corner) {
                        // 開始拖動時的效果
                        $(this).turn('stop');
                    }
                }
            }
        });

        // 在 loadBook() 之後添加這些代碼
        let isDragging = false;
        let startX = 0;

        $('#book').on('mousedown', function(e) {
            isDragging = true;
            startX = e.pageX;
            e.preventDefault();
        });

        $(document).on('mousemove', function(e) {
            if (!isDragging) return;
            
            let deltaX = e.pageX - startX;
            if (Math.abs(deltaX) > 50) {  // 拖動超過 50px 才觸發翻頁
                if (deltaX > 0) {
                    $('#book').turn('previous');
                } else {
                    $('#book').turn('next');
                }
                isDragging = false;
            }
        });

        $(document).on('mouseup', function() {
            isDragging = false;
        });
    }

    loadBook();

    // 綁定按鈕事件
    $('#prev').click(function() {
        $('#book').turn('previous');
    });

    $('#next').click(function() {
        $('#book').turn('next');
    });

    // 支援鍵盤左右鍵翻頁
    $(document).keydown(function(e) {
        if (e.keyCode == 37) {
            $('#book').turn('previous');
        } else if (e.keyCode == 39) {
            $('#book').turn('next');
        }
    });

    // 改進觸控支援
    $(window).on('touchstart', function(e) {
        var touch = e.originalEvent.touches[0];
        var x = touch.pageX;
        var width = $(window).width();
        
        if (x < width / 2) {
            $('#book').turn('previous');
        } else {
            $('#book').turn('next');
        }
        e.preventDefault();
    });
}); 