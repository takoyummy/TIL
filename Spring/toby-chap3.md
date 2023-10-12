# 템플릿 메서드 패턴
-  변하지 않는 부분은 슈퍼 클래스에 두고, 변하는 부분은 추상 메서드로 정의해 두어, 서브 클래스에서 오버라이드하여 새롭게 사용하는 것


₩₩₩java

abstract class Beverage {
    // 템플릿 메서드
    public final void prepareBeverage() {
        boilWater();
        brew();
        pourInCup();
        if (customerWantsCondiments()) {
            addCondiments();
        }
    }

    // 다음은 구체적인 구현 단계
    abstract void brew();
    abstract void addCondiments();

    // 공통 메서드
    void boilWater() {
        System.out.println("물 끓이는 중");
    }

    void pourInCup() {
        System.out.println("컵에 따르는 중");
    }

    // 후크 메서드 (서브클래스에서 선택적으로 재정의)
    boolean customerWantsCondiments() {
        return true;
    }
}

class Coffee extends Beverage {
    @Override
    void brew() {
        System.out.println("필터로 커피 우려내는 중");
    }

    @Override
    void addCondiments() {
        System.out.println("설탕과 우유 추가하는 중");
    }
}

class Tea extends Beverage {
    @Override
    void brew() {
        System.out.println("차 봅니다.");
    }

    @Override
    void addCondiments() {
        System.out.println("레몬 추가합니다.");
    }

    @Override
    boolean customerWantsCondiments() {
        return false;
    }
}

public class Main {
    public static void main(String[] args) {
        Beverage coffee = new Coffee();
        coffee.prepareBeverage();

        System.out.println();

        Beverage tea = new Tea();
        tea.prepareBeverage();
    }
}
₩₩₩
=> 단, 이 Template Method Pattern에도 두 가지 단점이 있다.
1. 상속을 사용하면, 컴파일 시점에 그 관계가 확장되어있음 
2. dao 로직마다 새로운 클래스 만들어야 함

# 전략 패턴
- 오브젝트를 아예 둘로 분리하고, 클래스 레벨에서는 인터페이스를 통해서 의존하도록 하는 것
- 확장에 해당하는 변하는 부분을 별도의 클래스로 만들어, 추상화된 인터페이스를 통해 위임하도록 만드는 것.

₩₩₩java
// 전략 인터페이스
interface SortStrategy {
    void sort(int[] array);
}

// 전략 구현 클래스
class BubbleSort implements SortStrategy {
    public void sort(int[] array) {
        System.out.println("버블 정렬 사용");
        // 실제 버블 정렬 알고리즘 구현
    }
}

class QuickSort implements SortStrategy {
    public void sort(int[] array) {
        System.out.println("퀵 정렬 사용");
        // 실제 퀵 정렬 알고리즘 구현
    }
}

// 컨텍스트 클래스
class Sorter {
    private SortStrategy strategy;

    public void setStrategy(SortStrategy strategy) {
        this.strategy = strategy;
    }

    public void performSort(int[] array) {
        strategy.sort(array);
    }
}

public class Main {
    public static void main(String[] args) {
        int[] array = {5, 2, 9, 1, 5};

        Sorter sorter = new Sorter();
        sorter.setStrategy(new BubbleSort());
        sorter.performSort(array);

        System.out.println();

        sorter.setStrategy(new QuickSort());
        sorter.performSort(array);
    }
}
₩₩₩

# 템플릿 / 콜백 패턴
- 단일 전략 메서드를 갖는 전략 패턴이면서, 익명 내부 클래스를 사용해서 매번 전략을 새로 만들어 사용하고, 컨텍스트 호출과 동시에
전략 DI를 수행하는 방식을 템플릿 / 콜백 패턴이라고 부른다.
- 템플릿은 여러 개의 콜백 사용 가능

