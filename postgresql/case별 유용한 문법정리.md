# 동일글자 중복 필터링
~ : 문자열 패턴 매칭시 사용되는 함수

정규 표현식의 기본 요소
문자 리터럴: 특정 문자를 직접 지정함.

메타 문자: 특별한 의미를 가진 문자. 예를 들어:

.: 어떤 한 문자와 일치
^: 문자열의 시작과 일치
$: 문자열의 끝과 일치
*: 0회 이상 반복되는 문자와 일치
+: 1회 이상 반복되는 문자와 일치
?: 0회 또는 1회 반복되는 문자와 일치
\: 다음 문자를 이스케이프합니다 (예: \.는 실제 마침표와 일치).
문자 클래스: 대괄호 [] 안에 위치한 문자 중 하나와 일치. 예를 들어, [abc]는 'a', 'b', 또는 'c'와 일치

범위: 문자 클래스 내에서 -를 사용하여 문자 범위를 지정할 수 있습니다. 예를 들어, [a-z]는 모든 소문자 알파벳과 일치.

반복자: 특정 패턴이 몇 번 반복되는지 지정. 예를 들어, {n}, {n,}, {n,m} 형태로 사용됩니다.

그룹화: 괄호 ()를 사용하여 패턴을 그룹화합니다. 이를 통해 하위 표현식을 캡처하고, 여러 번 반복되는 패턴을 지정할 수 있습니다.

SQL에서의 REGEXP 사용 예
"^a": 'a'로 시작하는 문자열과 일치
"a$": 'a'로 끝나는 문자열과 일치
"[a-z]": 소문자 알파벳 한 글자와 일치
"a{2,4}": 'a'가 2회에서 4회 반복되는 문자열과 일치
"(abc)+": 'abc'가 한 번 이상 반복되는 문자열과 일치
주의사항
SQL 구문과 데이터베이스에 따라 정규 표현식의 문법이나 지원하는 기능이 다를 수 있음
정규 표현식은 매우 강력하지만 복잡할 수 있으며, 잘못 사용하면 예상치 못한 결과를 초래할 수 있음
성능에 영향을 줄 수 있으므로, 대규모 데이터셋에서는 사용에 주의가 필요

=> 동일문자 4자 이상 일때

ex ) example_column ~ '(.)\\1{3,}' 
이런식으로 해서, (.)는 어떤 문자든 일치시키고 \\1{3,} 같은 문자가 3번 이상 반복되는 것을 찾아서 제외시킴.

(.)는 어떤 한 문자를 캡처하는 그룹. 이 부분은 문자열 내의 단일 문자와 일치
\\1은 앞서 (.)에 의해 캡처된 그룹, 즉 캡처된 문자를 참조.
{3,}는 앞선 패턴이 최소 3번 반복되어야 한다는 것을 의미.

# DATE_TRUNC

- postgresql에서 날짜와 시간 데이터를 특정 단위로 자르는 기능을 제공함.

```sql
DATE_TRUNC('field', source)
```

- field 이 부분에는 날짜 - 시간 필드를 어떤 단위로 자를 것인지 포함
- source : 날짜 - 시간 데이터를 포함하는 필드나 표현식 들어감

ex - 월단위 :

```sql
DATE_TRUNC('month', timestamp_field)
```

나의 같은 경우에는, 

```sql
GROUP BY DATE_TRUNC('month', sample.create_date)
```
이런 식으로 create_date를 월 별 기준으로 잘라 group by 할 때 사용했음. 