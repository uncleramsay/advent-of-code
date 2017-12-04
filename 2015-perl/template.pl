use strict;
use warnings;
use Data::Dumper;

my @aLines = ();
open(my $fh, '<', 'input.txt');
while(defined(my $sLine = <$fh>)) {
  chomp($sLine);
  push(@aLines, $sLine);
}
close($fh);

sub one {
  return '';
}

sub two {
  return '';
}

print "Solution one is: " . one() . "\n";
print "Solution two is: " . two() . "\n";
