import Slider from "./slider";

export default class MainSlider extends Slider {
    constructor(btns) {
        super(btns); // вызывает родительский конструктор
    }

    showSlides(n) {
        if (n > this.slides.length) {
            this.slideIndex = 1;
        } 

        if (n < 1) {
            this.slideIndex = this.slides.length;
        }

        try {
            this.hanson.style.opacity = '0';

            if (n === 3) {
                this.hanson.classList.add('animated');
                setTimeout(() => {
                    this.hanson.style.opacity = '1';
                    this.hanson.classList.add('slideInUp');
                }, 3000);
            } else {
                this.hanson.classList.remove('slideInUp');
            }
        } catch(e) {}

        Array.from(this.slides).forEach(slide => {
            slide.style.display = 'none';
        });

        this.slides[this.slideIndex -1].style.display = 'block';
    }

    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }

    bindTriggers() {
        this.btns.forEach(item => {
            item.addEventListener('click', () => {
                this.plusSlides(1);
            });

            item.parentNode.previousElementSibling.addEventListener('click', e => {
                e.preventDefault();
                this.slideIndex = 1;
                this.showSlides(this.slideIndex);
            });
        });

        document.querySelectorAll('.prevmodule').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation(); // отмена всплытия события, так как стелка справа тоже имеет класс next, что и родитель этой стрелки у маленького слайдера
                e.preventDefault();
                this.plusSlides(-1);
            }); 
        });   
        
        document.querySelectorAll('.nextmodule').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation(); // отмена всплытия события, так как стелка справа тоже имеет класс next, что и родитель этой стрелки у маленького слайдера
                e.preventDefault();
                this.plusSlides(1);
            }); 
        });  
    }

    render() {
        if (this.container) {
            // поиск всплывающего блока на третей странице
            try {
                this.hanson = document.querySelector('.hanson');
            } catch(e) {}

            this.showSlides(this.slideIndex);
            this.bindTriggers();
       } 
    }
}