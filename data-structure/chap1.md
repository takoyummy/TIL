# 1. equals / hashcode에 대해서

최상위 클래스인 Objects 클래스에서 equals 메서드는 다음과 같이 구현되어있다.

```java
public boolean equals(Object obj) {
    return (this == obj);
}

```

메모리 내 주소값이 같은지만 비교하고 있기 때문에, 객체끼리의 동일성을 담보한다.

만약 주소값이 아닌 값이 동등한지(동등성)를 체킹하고 싶다면, 해당 메서드를 오버라이딩하여, 해당 클래스의 특정 값들의 비교 기준을 정하여 재정의하면 된다.

보통 아래와 같은 순서로 재정의한다.

1. 동일한 주소값을 가지는지 비교
2. null 혹은 동일한 클래스인지 비교
3. 타입 캐스팅
4. 프로그래머가 지정한 필드 비교

```java
  @Override
  public boolean equals(Object o) {
    // 순서 1. 동일한 참조 값인지 비교
    if (this == o) return true;
    // 순서 2. null 또는 동일한 클래스인지 비교
    if (o == null || getClass() != o.getClass()) return false;
    // 순서 3. 타입 변환
    Sample sample = (Sample) o;
    // 순서 4. 필드 비교
    return Objects.equals(fieldName, sample.fieldName) && Objects.equals(fieldName2, sample.fieldName2);
  }
```

다음으로 hashcode는 실행중의 객체의 유일한 메모리 주소를 반환하는 메서드이다. heap에 저장된 객체의 메모리 주소를 반환한다.
Objects 클래스에 구현된 hashCode() 메서드는 다음과 같다.

```java
public static int hashCode(Object o) {

    return o != null ? o.hashCode() : 0;

}
```

자바의 컬렉션 프레임워크, 가령 HashSet이 해쉬 테이블을 사용하여 해시 값이 같은지 비교하기 때문에
Set에 동등성을 기준으로 중복체킹을 하고 싶다면 hashcode를 오버라이딩하여 equals에 정의한 기준으로 구현해야 한다.

```java
    @Override
    public int hashCode() {
        // 그렇다면 반드시 hashCode()도 kind와 number를 이용하여 만들어야한다.
        // 즉 해시코드 비교가 equals와 동일한 결과를 반환하도록 구현해야 한다.
        return Object.hash(fieldName, fieldName2)
    }
```

# 2. List를 사용할 때 add()메서드를 계속 사용해도 계속 들어간다. 그 이유는 무엇일까?

- List는 크기를 정해주지 않아도 되는 가변적으로 크기가 변하는 선형 리스트임.
- 내부적인 구현을 살펴보면 다음과 같다.

```java
    public class ArrayList<E> extends AbstractList<E>
        implements List<E>, RandomAccess, Cloneable, java.io.Serializable
{
    transient Object[] elementData; // non-private to simplify nested class access

    /**
    * The size of the ArrayList (the number of elements it contains).
    *
    * @serial
    */
    private int size;

    private static final Object[] DEFAULTCAPACITY_EMPTY_ELEMENTDATA = {};

    public ArrayList() {
        this.elementData = DEFAULTCAPACITY_EMPTY_ELEMENTDATA;
    }
    ...

    /**
     * This helper method split out from add(E) to keep method
     * bytecode size under 35 (the -XX:MaxInlineSize default value),
     * which helps when add(E) is called in a C1-compiled loop.
     */
    private void add(E e, Object[] elementData, int s) {
        if (s == elementData.length)
            elementData = grow();
        elementData[s] = e;
        size = s + 1;
    }

    /**
     * Appends the specified element to the end of this list.
     *
     * @param e element to be appended to this list
     * @return {@code true} (as specified by {@link Collection#add})
     */
    public boolean add(E e) {
        modCount++;
        add(e, elementData, size);
        return true;
    }

    private Object[] grow() {
        return grow(size + 1);
    }

    private Object[] grow(int minCapacity) {
        return elementData = Arrays.copyOf(elementData,
                                           newCapacity(minCapacity));
    }

    private int newCapacity(int minCapacity) {
        // overflow-conscious code
        int oldCapacity = elementData.length;
        int newCapacity = oldCapacity + (oldCapacity >> 1);
        if (newCapacity - minCapacity <= 0) {
            if (elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA)
                return Math.max(DEFAULT_CAPACITY, minCapacity);
            if (minCapacity < 0) // overflow
                throw new OutOfMemoryError();
            return minCapacity;
        }
        return (newCapacity - MAX_ARRAY_SIZE <= 0)
            ? newCapacity
            : hugeCapacity(minCapacity);
    }


    ...
}


```

- ArrayList 클래스에 내부적으로 Object[] 배열과 size를 지니고 있음.
- add 할때마다 add(e, elementData, size); 메서드를 타는데, 해당 메서드는 내부의 배열을 확인하고, 만약 내부의 elementData 배열의 길이와 size가 같으면 grow()가 수행
- grow() 메서드는 사이즈를 늘려서 배열을 복사하여 elemendData[]로 반환하는 역할을 수행함.

즉, 내부적으로 배열의 크기를 유연하게 조절 및 복사하여 재할당하기 때문에 add()메서드를 사용해도 계속 들어가는 것이다.

# 3. ArrayList와 LinkedList의 차이는?

## ArrayList

- 데이터 추가시 더 큰 용량의 배열을 만들어서 복사

- 중복 허용

- 인덱스로 원소 관리

- 원소 추가, 삭제 가능

## LinkedList

- 연결된 노드들의 집합으로, 각 노드는 데이터와 포인트로 이루어져 있다.

- 데이터 추가시 새로운 노드를 만들고 이전 노드 포인터를 새 노드에 가리키게 만듬

## 삽입

ArrayList : O(N) => 삽입 후, 뒤에 있는 원소들을 뒤로 이동시켜야 함. 최악의 경우 O(N-1) 이므로 O(N)
LinkedList : O(1) => 이전 노드와 다음 노드를 참조하는 상태만 변경하면 되기 때문에 O(1).( 배열 복사 작업이 필요 없고 포인트만 변경해주면 됨.)

## 삭제

ArrayList: O(N) => 삭제 후, 뒤에 있는 원소들을 앞으로 이동시켜야 함. 최악의 경우 O(N-1)이므로 O(N)
LinkedList : O(1) => 이전 노드와 다음 노드를 참조하는 상태만 변경하면 되기 때문에 O(1).( 배열 복사 작업이 필요 없고 포인트만 변경해주면 됨.)

## 탐색

ArrayList : O(1) => 특정 index요소 찾는 경우 O(1)
LinkedList : O(n) => 가장 앞 노트부터 다음 노드를 하나씩 보면서 원하는 데이터를 찾는 선형탐색 기법을 씀. 최악의 경우 n개 노드를 다 봐야하기 때문에 O(n)

# 4. RDB에서 사용하는 인덱스는 어떤 종류가 있는지?

1. 기본 인덱스(Primary Index) : 테이블의 기본 키(PK)컬럼에 대한 인덱스

2. 고유 인덱스(Unique Index) : 특정 컬럼의 값들이 고유해야할 때 사용되는 인덱스

3. 클러스터링 인덱스 : 실제 데이터와 같은 무리의 인덱스 

    - 실제 데이터 자체가 정렬
    
    - 테이블당 1개만 존재 가능
    
    - 리프 페이지가 데이터 페이지
    
    - PK 혹은 UNIQUE + NOT NULL 조건 걸면 자동으로 생성됨

4. 논클러스터링 인덱스(보조 인덱스, 세컨더리 인덱스) :

    - 실제 데이터와 다른 무리의 별도의 인덱스 (unique)
    
    - 추가 공간이 필요함
    
    - 테이블 당 여러개 존재 가능
    
    - 리프 페이지에 실제 데이터 페이지 주소 담고 있음
    
    - unique 제약조건 적용시 자동 생성
    
    - 직접 index 생성시 논-클러스터링 인덱스 생성

=> 인덱스 적용 기준 :

    1. 카디널리티(Cardinality-그룹 내 요소의 개수)가 높은 컬럼에 인덱스를 적용해야 함 => 중복 수치가 낮은 것
    
    2. where, join, order by 절에 자주 사용되는 컬럼
    
    3. insert / update / delete 가 자주 발생하지 않는 컬럼
    
    4. 규모가 작지 않은 테이블

# 5. B+Tree의 장점과 단점은 무엇인지?

    장점 :
    1. Balanced Tree구조이기때문에, 모든 리프 노드가 동일한 깊이에 있어서 탐색이 효율적으로 이루어진다.
    2. leaf node에만 데이터가 저장되기 때문에 메모리 공간을 적게 사용한다.
    3. 각 노드의 자식들이 연속적인 범위를 가져서, 범위 검색 연산에도 최적화 되어있다.
    4. 리프노트가 연결리스트로 되어있어서 순차적으로 데이터 접근하는 경우에 효율적인 액세스 패턴을 지닌다.

    단점 :

    1. B-Tree의 경우 각 노드에 데이터들이 존재하여, 운이 좋은경우 O(1)에도 찾을 수 있는 반면, B+Tree의 경우 데이터가 항상 leaf node에 있기 때문에 무조건 데이터노드가 있는 위치까지 찾아가야 한다.

    # a. 모든 값이 리프노드에 저장되어있고 연결리스트로 연결되어있는데 이 장점은 무엇인가?

    데이터가 모두 리프 노드 단에 있기 때문에, 풀 스캔시 리프노드에서 선형 탐색을 진행하면 된다. 이는 범위 탐색시 유용하다.
    또한 연결리스트의 특성상 삽입 삭제가 용이하다.

참고하면 좋은 자료

https://inpa.tistory.com/entry/JCF-%F0%9F%A7%B1-ArrayList-vs-LinkedList-%ED%8A%B9%EC%A7%95-%EC%84%B1%EB%8A%A5-%EB%B9%84%EA%B5%90
