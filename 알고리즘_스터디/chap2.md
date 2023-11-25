LeetCode 5 (~2023.11.29)

217. Contains Duplicate
     https://leetcode.com/problems/contains-duplicate/

```java
import java.util.Set;
import java.util.HashSet;
import java.util.Set;

class Solution {
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> numSet = new HashSet<>();

        for (int i = 0; i < nums.length; i++) {
            numSet.add(nums[i]);
        }

        int prevSize = nums.length;
        int afterSize = numSet.size();

        if(prevSize == afterSize) {
            return false;
        } else {
            return true;
        }
    }
}

/*
1. 적어도 한 숫자가 두 번 나오면 true를 리턴하는 것
2. 모든 element가 다 다른 숫자면 false
true라면
Set을 써서, 넣고, 중복값이 하나라도 들어간다면 인풋으로 들어간 개수와 일치하지 않을 것임.
false라면
개수 일치할 것.

시간복잡도 : O(n)
*/

```

35. Search Insert Position
    https://leetcode.com/problems/search-insert-position/

```java
    public int searchInsert(int[] nums, int target) {
        int startIndex = 0;
        int endIndex = nums.length - 1;
        int middleIndex;

        while(startIndex <= endIndex) { // statrtIndex <= endIndex
            middleIndex = ( startIndex + endIndex ) / 2;

            if(nums[middleIndex] > target) {
                endIndex = middleIndex - 1;
            } else if (nums[middleIndex] < target){
                startIndex = middleIndex + 1;
            } else {
                return middleIndex;
            }
        }

        return startIndex;

    }

```

- 이분 탐색 사용

242. Valid Anagram
     https://leetcode.com/problems/valid-anagram/

```java

import java.util.Map;
import java.util.HashMap;

class Solution {
    public boolean isAnagram(String s, String t) {
        Map<Character, Integer> charMap = new HashMap<>();

        for(int i = 0; i < s.length(); i++) {
            char alpha = s.charAt(i);

            if(charMap.get(alpha) == null) {
                charMap.put(alpha, 1);
            } else {
                charMap.put(alpha, charMap.get(alpha) + 1);
            }

        }

        for(int i = 0; i < t.length(); i++) {
            char alpha = t.charAt(i);

            if(charMap.get(alpha) == null) {
                charMap.put(alpha, -1);
            } else {
                charMap.put(alpha, charMap.get(alpha) - 1);
            }
        }

        for(int value : charMap.values()) {
            if(value != 0) {
                return false;
            }
        }

        return true;
    }
}

```

- HashMap 사용해서,
- 1. key값에 알파벳 값 넣어주고, value에 count 넣어줌
- 2. t돌때, -1 해줌
- 3. 결론적으로 value값들을 돌아서 0이 아닌 값들이 있다면 불일치 하는 값이 하나라도 존재하는 것.

243. Group Anagrams
     https://leetcode.com/problems/group-anagrams/

244. Top K Frequent Elements
     https://leetcode.com/problems/top-k-frequent-elements/
