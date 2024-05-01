# indent-sorter

A Visual Studio Code extension that sorts blocks of highlighted code grouped by indentation. Sorting is keyed on the first line in the block that is not a comment.

## Example

Before

```ruby
  # comment
  z_is_not_a_method

  # This is a ruby comment
  def B
    call_method
  end

  def A
    # empty method
  end
```

After

```ruby
  def A
    # empty method
  end

  # This is a ruby comment
  def B
    call_method
  end

  # comment
  z_is_not_a_method
```

More examples in [src/test/indent-sorter/](src/test/indent-sorter/)
