use strict;
use warnings;
use Data::Dumper;

# my @aLines = ();
# open(my $fh, '<', 'input.txt');
# while(defined(my $sLine = <$fh>)) {
#   chomp($sLine);
#   push(@aLines, $sLine);
# }
# close($fh);

my $sInput = '1321131112';

sub one {

  my $sRval = $sInput;

  for (my $i = 0; $i < 40; $i++) {
    $sRval = calculate($sRval);
  }

  return length($sRval);
}

sub two {
  my $sRval = $sInput;

  for (my $i = 0; $i < 50; $i++) {
    $sRval = calculate($sRval);
  }

  return length($sRval);
}

sub calculate {
  my $sKey = shift @_;
  my $sRval = '';

  for(my $i = 0; $i < length($sKey);) {
    my $sChar = substr($sKey, $i, 1);
    my $sCount = 1;
    for(my $j = $i+1; substr($sKey, $j, 1) eq $sChar; $j++) {
      $sCount++;
    }

    $i += $sCount;

    $sRval .= $sCount . $sChar;
  }

  return $sRval;
}

print "Solution one is: " . one() . "\n";
print "Solution two is: " . two() . "\n";
