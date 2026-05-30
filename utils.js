export function shuffleArray(array) {

  return [...array].sort(() => Math.random() - 0.5);
}

export function showScreen(screenId) {

  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.add('hidden');
  });

  document.getElementById(screenId).classList.remove('hidden');
}

export function getFeedbackByScore(score) {

  if (score >= 90) {
    return {
      title: 'Xuất sắc!',
      message:
        'Bạn đang sở hữu kiến thức nền tảng rất tốt về âm nhạc và phụng vụ.',
      encouragement:
        'Hy vọng bạn sẽ tiếp tục dùng những khả năng Chúa ban để phục vụ Giáo hội cùng với Lumen.'
    };
  }

  if (score >= 75) {
    return {
      title: 'Rất tốt!',
      message:
        'Bạn đã có nền tảng khá vững để đồng hành cùng Lumen tiến xa hơn trên hành trình âm nhạc.',
      encouragement:
        'Hành trình phục vụ luôn là hành trình học hỏi không ngừng. Cảm ơn bạn đã tiếp tục lớn lên cùng nhau.'
    };
  }

  if (score >= 50) {
    return {
      title: 'Khá tốt!',
      message:
        'Bạn đã có những nền tảng căn bản và vẫn còn nhiều điều thú vị để khám phá thêm.',
      encouragement:
        'Đừng lo lắng nhé, Lumen luôn tin rằng mọi hành trình trưởng thành đều bắt đầu từ sự kiên trì và lòng yêu mến.'
    };
  }

  return {
    title: 'Tiếp tục cố gắng nhé!',
    message:
      'Bạn cần thêm thời gian để củng cố các kiến thức nền tảng về nhạc lý và phụng vụ.',
    encouragement:
      'Không sao cả. Điều quan trọng nhất không phải là điểm số, mà là tinh thần sẵn sàng học hỏi và phục vụ bằng cả trái tim.'
  };
}
