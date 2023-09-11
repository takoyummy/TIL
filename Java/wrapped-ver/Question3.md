# 1. 자바에서 String을 불변객체로 되어있는 이유는 무엇이며, 어떤 장점을 얻으려고 햇을까?

불변 객체는 완전히 생성된 후에도 내부 상태가 일정하게 유지되는 개체로, 객체가 변수에 할당되면 참조를 업데이트하거나 내부 상태를 어떤 방법으로도 변경할 수 없다.

String을 불변객체로 사용하는 이유는,

1. String Pool에서 관리하여 값이 같으면 해당 객체를 재사용할 수 있게 하여 힙 공간을 절약하기 위해서이다.
2. 불변객체는 값이 바뀔 일이 없어서 멀티 스레드 환경에서 Thread-safe하다는 장점이 있다.
3. 불변이기 때문에, host값이나 port값이 해커의 공격으로부터 변경되는 것을 예방할 수 있다.
4. Java에서 String의 hashcode를 생성단계에서부터 캐싱하기 때문에, hashcode는 쓰일 때마다 매번 계산되지 않는다. hashcode가 캐싱될 수 있는 이유는 String이 불변이기 때문이다. 이 특징으로 인해 자바의 HashMap을 사용할 경우에 효과를 발휘한다. String을 key로 했을때, 더 빠른 속도로 사용할 수 있다.

# 2. RDB에서 사용하는 인덱스 자료구조의 종류는?

hashmap, b-tree, b+tree => 각각 조사

# 3. 그 B+Tree자료구조의 장단점은?

HashMap

B-Tree

B+Tree

장점 :

1. leaf node끼리 linked list로 연결되어있어서, 순차 탐색에 유리하다.
2. 모든 리프노드가 동일한 레벨에 있기 때문에, 검색 및 삽입 연산이 O(logN) 시간에 수행된다. 이는 대량 데이터를 다룰 때 유리하다.
3. B+트리는 데이터를 정렬된 순서로 유지하기 때문에, 정렬된 결과를 요구하는 경우 유리하다.

단점 :

1. b-tree의 경우 best case에서는 루트에서 끝날 수 있지만, B+Tree의 경우 무조건 leaf node까지 가야한다.
2. 삽입 및 삭제 작업이 복잡하기 때문에 오버헤드가 발생 가능. (부모 노드까지 올라가면서, 꽉 차있으면 분할작업 하고 노드들의 위치 재조정하기 때문)

# 4. ArrayList에 add를 계속해도 계속 데이터가 들어갈 수 있는 이유는? 내부적으로 어떻게 처리?

```java
    public class ArrayList<E> extends AbstractList<E>
        implements List<E>, RandomAccess, Cloneable, java.io.Serializable
{
    transient Object[] elementData; // non-private to simplify nested class access. 직렬화 대상에서 제외됨. ArrayList의 역할을 할 필드

    /**
    * The size of the ArrayList (the number of elements it contains).
    *
    * @serial
    */
    private int size; // size

    private static final Object[] DEFAULTCAPACITY_EMPTY_ELEMENTDATA = {}; // 비어있는 Object 배열

    public ArrayList() {
        this.elementData = DEFAULTCAPACITY_EMPTY_ELEMENTDATA; // 비어있는 Object 배열로 초기화.
    }
    ...


    /**
     * Appends the specified element to the end of this list.
     *
     * @param e element to be appended to this list
     * @return {@code true} (as specified by {@link Collection#add})
     */
    public boolean add(E e) {
        modCount++; // 1. 얼마나 변경되었는지 기록하는 변수. AbstractList로부터 상속 받음. +1 처리함.
        add(e, elementData, size); // 2. 또 다른 add 메서드 실행
        return true;
    }

    /**
     * This helper method split out from add(E) to keep method
     * bytecode size under 35 (the -XX:MaxInlineSize default value),
     * which helps when add(E) is called in a C1-compiled loop.
     */
    private void add(E e, Object[] elementData, int s) {
        if (s == elementData.length) // 3. elementData의 길이와 size가 같으면
            elementData = grow();
        elementData[s] = e; // 5. size 배열 인덱스에 e값을 저장.
        size = s + 1; // 6. size포인터를 + 1만큼 이동시킴
    }


    private Object[] grow() {
        return grow(size + 1); // 아래의 오버로딩된 메서드 실행
    }

    private Object[] grow(int minCapacity) { // 초기 param으로 넘긴 minCapacity == 1
        return elementData = Arrays.copyOf(elementData,
                                           newCapacity(minCapacity)); // 4. 현재 elemendData값을 복사하고, newCapacity(minCapacity)값을 넘겨 새로운 길이를 가지는 배열 생성함.
    }

    private int newCapacity(int minCapacity) {
        // overflow-conscious code
        int oldCapacity = elementData.length; // 내부 변수 기존 길이
        int newCapacity = oldCapacity + (oldCapacity >> 1); // 새 길이 = 기존 길이 + 왼쪽으로 시프트 연산 (해당 값의 1/2 ) => 따라서 새길이 = 기존 길이의 1.5배
        if (newCapacity - minCapacity <= 0) { // newCapacity - minCapacity <= 0 이면 => minCapacity가 더 크면
            if (elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA) // elementData == {} 이면
                return Math.max(DEFAULT_CAPACITY, minCapacity); // Math.max(DEFAULT_CAPACITY, minCapacity) , 10을 반환하거나,minCapacity 반환한다.
            if (minCapacity < 0) // overflow => minCapacity가 0보다 작으면
                throw new OutOfMemoryError(); // throwing OOM Error
            return minCapacity; // 두 가지 조건을 minCapcacity를 반환
        }
        return (newCapacity - MAX_ARRAY_SIZE <= 0) // MAX_ARRAY_SIZE보다 newCapacity가 작으면
            ? newCapacity // newCapacity를 반환하고
            : hugeCapacity(minCapacity); // MAX_ARRAY_SIZE보다 크면 Integer.MAX_VALUE 혹은 MAX_ARRAY_SIZE 크기의 hugeCapacity를 반환한다.
    }
....
}

```

# 5. System.out.println()을 실 서비스에서 사용하면 안된다는데 그 이유는?

1. 로그 레벨 출력이 불가능하다. (trace, debug, info, warn, error, fatal )
   => 각 환경마다 로그 설정 불가

2. 로그에 필요한 정보가 없음. sout은 단순히 문자열을 찍는 메서드여서, 로깅시 필요한 위치, 날짜, 시각등의 정보를 표시할 수 없다.

3. System.out.println은 따로 기록되지 않아 로그파일로서 관리가 불가능하다.

4. ```java
       public void println(int x) {
        if (getClass() == PrintStream.class) {
            writeln(String.valueOf(x));
        } else {
            synchronized (this) { // 여기 주목
                print(x);
                newLine();
            }
        }
    }
   ```
   println은 synchronized로 동기화 처리가 되어있어서 오버헤드(어떤 처리를 하기 위해 추가로 들어가는 처리시간)가 발생할 수 있다. synchronized는 한 시점에 1개의 스레드만 접근 가능함.
   => Blocking I/O 모델. 이 모델은 입출력 작업이 완료될 때까지 스레드 또는 프로세스가 대기하는 방식임. 입출력 작업이 진행되면 해당 스레드는 다른 작업을 수행하지 못하고 블록상태로 대기함. 주로 동기적인 작업에서 사용됨.

# 6. HashMap의 시간복잡도? 최악의 케이스는? 해시맵 구현체 안에는 어떻게 처리 되어있을까?

- 값을 삽입하고 검색하는 시간 복잡도가 평균 O(1) => 해시함수에 의해 바로 계산해서 키와 값의 쌍을 저장하고 검색하기 때문.
  해시 테이블로 구현되어있으며, 해시 코드를 사용하여 해당 키의 버킷을 결정하고, 이 버킷에서 키-값 쌍을 저장 또는 검색함.
- 최악의 경우, 해시 충돌이 일어날 수 있는데, 동일한 버킷에 여러개의 키-값 쌍이 저장되어, 검색시에 버킷내에서 추가적인 작업이 필요하게 된다.
  시간 복잡도가 O(n)이 될 수 있다.

=> 구현체

# 7. 프로세스와 스레드의 차이?

프로세스는 운영체제로부터 시스템 자원을 할당받는 작업의 단위이고, 실행된 프로그램을 의미함.
스레드는 프로세스가 할당받은 자원을 이용하는 실행단위로, 한 개의 프로세스는 하나 이상의 스레드를 포함할 수 있다.

또한 각각의 프로세스는 자신만의 별도 주소공간을 독립적으로 할당받는 반면, 스레드는 다른 스레드와 공간(data, heap, code영역)을 공유하면서 사용함.

# 8. CPU코어 개수와 스레드와의 상관관계는?

코어와 스레드의 관계는 cpu의 병렬 처리능력을 결정한다. 다중 코어를 사용하면 물리적으로 동시에 여러 작업을 처리할 수 있다.

# 9. 멀티 스레드 프로그래밍을 사용할때 어떤 점을 고려하고 주의해야할까?

멀티 스레드 사용시, 같은 메모리 공간을 공유하기 때문에 레이스 컨디션이 발생할 수 있음.

1.  값 0이 저장된 변수 a
2.  스레드 A는 변수 a를 읽어온다.
3.  스레드 B는 변수 a를 읽어온다.
4.  스레드 A는 변수 a에 값을 5 더한 값을 저장한다.
5.  스레드 B는 변수 a에 값을 1 더한 값을 저장한다.

이 때, 레이스 컨디션이 발생할 경우 스레드 a가 예상한 6이 아닌, 1이 들어갈 수 있음.

=> 이를 해결하기 위해 락을 사용함. 자바의 경우 synchronized 키워드를 활용함.

상호 배제 (Mutual Exclusion)=> 여러 스레드가 공유 데이터나 자원에 접근하는 경우, 이러한 접근을 제어하기 위해 상호 배제 메커니즘이 필요함.
뮤텍스나 세마포어 같은 기법 필요.

뮤텍스 : 가장 기본적인 상호 배제 매커니즘중 하나. 뮤텍스는 특정 자원에 대한 접근을 보호하기 위한 동기화 객체.
뮤텍스를 해제하고 접근하는 스레드만이 자원에 접근할 수 있음. 다른 스레드는 뮤텍스를 획득하기 위해 대기

세마포어(Semaphore): 세마포어는 뮤텍스와 유사하지만, 뮤텍스는 단순한 이진 상태(잠금 또는 잠금 해제)를 제공하는 반면, 세마포어는 더 복잡한 상태를 가질 수 있음. 세마포어는 동시에 접근을 허용하는 스레드 수를 제한할 수 있으므로, 자원의 동시 접근을 조절하는 데 유용함.

크리티컬 섹션(Critical Section): 프로그래머가 직접 뮤텍스나 세마포어를 사용하지 않고, 언어나 라이브러리에서 제공하는 상호 배제 메커니즘을 활용하는 방법. 일부 언어 및 런타임 환경은 크리티컬 섹션을 사용하여 특정 코드 블록을 동시에 하나의 스레드만 실행되도록 보호함. => 이게 자바에서 synchronized 키워드임.

# 10. synchronized키워드를 달면 성능에 어떤 영향을 미칠까? 왜 미칠까?

synchronized는 자바에서 다중 스레드 환경에서 동기화를 달성하기 위해 사용되는 중요 매커니즘중 하나로,synchroized를 사용하면 스레드 간의 경쟁조건을 방지하고 공유 데이터에 대한 안전한 접근 보장 가능. 다만, 성능 영향을 끼칠 수 있음

1. 동기화 오버헤드 :

- synchronzied는 한 번에 하나의 스레드만 진입할 수 있도록 락을 얻는데 시간이 걸림. 따라서 synchroized 블록 내에서 작업이 느려질 수 있음.

- 여러 스레드가 synchronized 블록에 진입하려고 시도하는 경우 대기시간이 발생하고 스레드 스케줄링 오버헤드가 발생할 수 있음.

2. 데드락 발생가능 :

- synchronized를 사용하면 데드락이 발생할 가능성이 있음. 데드락은 스레드 간의 상호 대기 상태로 전체 프로그램이 멈추는 상황을 의미.
- 올바른 동기화와 락의 순서를 지키는 것이 데드락을 방지하는데 중요.

3. 과도하게 동기화를 사용할 경우, 스레드간 경쟁이 증가하고, 오버헤드가 더 많이 발생할 수 있다.

=> 락이란 ?
멀티 스레드 환경에서 공유 데이터나 자원을 동기화할 수 있는 기법. 락은 스레드가 특정 자원에 대한 접근 권한을 획득하거나 해제할 수 있는 동시성 제어 메커니즘.

=> 올바른 락의 순서?

=> 스레드 스케줄링?

```

```
