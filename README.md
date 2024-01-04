| endpoint              | method | summary                 | body                                                                                                                                     |
| --------------------- | ------ | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| /trigger/xp           | POST   | Trigger an XP Reward    | address: ethereum address of receiver, id: id of action completed, amount: amount of XP to reward                                        |
| /trigger/reward_token | POST   | Trigger an Reward token | address: ethereum address of receiver, id: id of action completed, amount: amount of XP to reward                                        |
| /trigger/badge        | POST   | Sent a user a badge     | address: ethereum address of receiver, id: id of action completed, amount: amount of XP to reward, badgeId: address or name of the badge |
