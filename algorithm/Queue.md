# Queue 샘플 코드

```java



public class Main {
    public static void main(String[] args) {
        Queue<Integer> que = new LinkedList<>();

        que.add(3);

        System.out.println(que.peek()); // 맨 앞에 있는게 나옴

        System.out.println(que.poll()); // pop
        System.out.println(que.size()); // size

    }
}


```
