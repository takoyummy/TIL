# Algorithm

거리 구하는 스킬

1. Math.abs(시작점 - 끝점) 사용

for example,

```
//위는 3중 for문
if((Math.abs(a - i) <= 2 || Math.abs(a - i) >= n - 2) && (Math.abs(b - j) <= 2 || Math.abs(b - j) >= n - 2) &&
                            (Math.abs(c - k) <= 2 || Math.abs(c - k) >= n - 2))
                        cnt++;

```

위는 N길이의 원형 자물쇠가 있다고 가정할 때, 2이하의 거리이내인 를 구할때 사용하는 예제.

Math.abs로 시작점과 끝점을 빼서 거리를 구하고
해당하는 거리가 n -2보다 크거나 2보다 작으면 거리가 2이내인 것.
